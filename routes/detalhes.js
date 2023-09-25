var express = require('express');
var router = express.Router();
const database = require('../models/db');
const Pacote = require('../models/pacote');
const Usuario = require('../models/Usuario');
const correios = require('correios-rastreamento')
const verificaAutenticacao = require('../public/middlewares/verificaAutenticacao'); // Importe o middleware
const converteDataEHora = require('../public/javascripts/converteDataEHora');
const sequelize = require('sequelize');
//const { Op } = require('sequelize');
const { use } = require('.');


/* GET users listing. */
router.get('/:id?',verificaAutenticacao, async function(req, res, next) {
const codigo = req.params.id;

//testa se o user esta logado
var logado;

if(typeof userLogado === 'undefined'){
  res.redirect("/login");
  }else{
    logado = userLogado.nome;
    console.log("Usuario logado == " + logado)

  }// fim do user logado


  const pacoteComCodigo = await Pacote.findOne({
    where: {
      codigo: codigo
    }
  });

  if(pacoteComCodigo && pacoteComCodigo.alterado == "1"){
  pacoteComCodigo.alterado = "0";
  await pacoteComCodigo.save();
console.log("Alterou o registro de alteraçõe do PACOTE = " + pacoteComCodigo.nome);
  }




console.log("Codigo recebido o  ID " + codigo + "[][][][][][]")

var detalhes; 
var hora=[];
correios.sroV2.rastrearObjeto(codigo).then(function(res){

  /*
  const numero = 1;
  console.log("RES Status "  + res.status_list[numero].status)
  console.log("RES Data "    + res.status_list[numero].data)
  console.log("RES Local "   + res.status_list[numero].local)
  console.log("RES Origem "  + res.status_list[numero].origem)
  console.log("RES Destino " + res.status_list[numero].destino)
*/
  return res;
}).then(data =>
{
detalhes = data;

console.log(detalhes);

  //const ultimoStatus = (data.status_list.length) - 1;
  //console.log("length ======  " + ultimoStatus)
  //var grav = data.status_list[ultimoStatus].status

//grav = grav.replace("Objeto","Pacote")
//grav.replace(" - por favor aguarde"," ")


for(var x = 0; x < detalhes.status_list.length; x++){ 
 const dtHr = converteDataEHora(detalhes.status_list[x].data);
  detalhes.status_list[x].data = dtHr[0];
  hora[x] = dtHr[1];
  detalhes.status_list[x].status = detalhes.status_list[x].status.replace("Objeto","Pacote");
  detalhes.status_list[x].status = detalhes.status_list[x].status.replace(" - por favor aguarde"," para");
  }

 





  




res.render('detalhes',{ title: 'Pacotama',logado, detalhes, codigo, hora});
})


});

module.exports = router;
