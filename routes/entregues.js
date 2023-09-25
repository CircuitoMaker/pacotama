var express = require('express');
var router = express.Router();
const Usuario = require('../models/Usuario');
const Pacote = require('../models/pacote');
const sequelize = require('sequelize');

const converteDataEHora = require('../public/javascripts/converteDataEHora');
const ordenaPorData = require('../public/javascripts/ordenaPorData');

/* GET home page. */
router.post('/', async(req, res, next)=> {

  if(!req.session.userLogged){
    return res.redirect('/login');//index
  }
  
   userLogado = req.session.userLogged;


  //filtra as buscas no banco para não trazer pacotes que ja foram entregues  
  const user = await Usuario.findByPk(userLogado.idUsuario, {
    include: {
      model: Pacote,
      where: {
        status: 'Objeto entregue ao destinatário'
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




for(var x=0; x< conteudo.length; x++){
const dtHr = converteDataEHora(conteudo[x].data);
conteudo[x].data = dtHr[0];
conteudo[x].hora = dtHr[1];
}

let status = []; 

for(var x=0; x< conteudo.length; x++){
  conteudo[x].status = conteudo[x].status.replace("Objeto","Pacote");
  conteudo[x].status = conteudo[x].status.replace(" - por favor aguarde"," para");
status[x] = "entregue";
}


const diasUteis = 0;

  res.render('index', { title: 'Pacotama', cards, conteudo, logado, status, diasUteis});
});

module.exports = router;
