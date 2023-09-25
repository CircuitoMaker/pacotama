var express = require('express');
var router = express.Router();

const Usuario = require('../models/Usuario');
const Pacote = require('../models/pacote');
const sequelize = require('sequelize');

const converteDataEHora = require('../public/javascripts/converteDataEHora');
const ordenaPorData = require('../public/javascripts/ordenaPorData');

/* GET home page. */
router.get('/', async(req, res, next)=> {

  if(!req.session.userLogged){
    return res.redirect('/login');//index
  }
  
   userLogado = req.session.userLogged;

  //const user = await Usuario.findByPk(userLogado.idUsuario,{include:Pacote});

  //filtra as buscas no banco para não trazer pacotes que ja foram entregues  
  const user = await Usuario.findByPk(userLogado.idUsuario, {
    include: {
      model: Pacote,
      where: {
        status: {
          [sequelize.Op.not]: 'Objeto entregue ao destinatário'
        }
      }
    }
  });

 let conteudo; 
 let cards = 0;

  if (user && user.Pacotes) {
       conteudo = user.Pacotes;
       qtdPacotes = conteudo.length;
        cards = user.Pacotes.length;
        let conteudoOrdenado = ordenaPorData(conteudo);
        conteudo = conteudoOrdenado;
  }else{
      conteudo = 0;
  }
 
  let logado = userLogado.nome;



const diasUteis=[];
for(var x=0; x< conteudo.length; x++){
const dtHr = converteDataEHora(conteudo[x].data);
conteudo[x].data = dtHr[0];
conteudo[x].hora = dtHr[1];

// Substitua esta data pela data desejada no formato ISO 8601
const inputDate = conteudo[x].dataOld//"2023-08-01"; 
const startDate = new Date(inputDate);
const currentDate = new Date();
let count = 0;

while (startDate <= currentDate) {
  const day = startDate.getDay();
  if (day >= 1 && day <= 5) {
    count++;
  }
  startDate.setDate(startDate.getDate() + 1);
}
 diasUteis[x] = count;

}// fim do for


let status = [];
let arrStatus = ["saiuParaEntrega","tributado","postado","emTransito"];

for(var x=0; x< conteudo.length; x++){
  conteudo[x].status = conteudo[x].status.replace("Objeto","Pacote");
  conteudo[x].status = conteudo[x].status.replace(" - por favor aguarde"," para");

    //saiu para entrega
  let aux0 = conteudo[x].status.indexOf("saiu para entrega")
  if(aux0 > 0){
    status[x] = arrStatus[0];
  }

  //em trânsito"
  let aux1 = conteudo[x].status.indexOf("tributado")
   if( aux1 > 0){
    status[x] = arrStatus[1];
  }

  //postado
  let aux2 = conteudo[x].status.indexOf("recebido pelos Correios")
   if(aux2 > 0 ){
    status[x] = arrStatus[2];
  }

 //postado
 let aux3 = conteudo[x].status.indexOf("postado")
 if(aux3 > 0 ){
  status[x] = arrStatus[2];
}




  if(status[x] == undefined){
  status[x] = arrStatus[3];
}
console.log("O valor do status é "+ x + " " + status[x])
}


  res.render('index', { title: 'Pacotama', cards, conteudo, logado, status, diasUteis});
});

module.exports = router;


