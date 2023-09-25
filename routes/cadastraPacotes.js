var express = require('express');
var router = express.Router();
const database = require('../models/db');
const Pacote = require('../models/pacote');
const correios = require('correios-rastreamento')
const verificaAutenticacao = require('../public/middlewares/verificaAutenticacao'); // Importe o middleware

//data e hora 
var dataAtual = new Date();
var dia = dataAtual.getDate().toString().padStart(2,'0');
var mes = (dataAtual.getMonth() + 1).toString().padStart(2,'0');
var ano = dataAtual.getYear()-100;
var horas = dataAtual.getHours().toString().padStart(2,'0');
var minutos = dataAtual.getMinutes().toString().padStart(2,'0');


/* post home page. */
router.post('/',verificaAutenticacao,async (req, res, next)=> {
  
 let codRastreio =[req.body.codigo];

  correios.sroV2.rastrearObjeto(codRastreio).then(function(res){

    const numero = 1;
    console.log("");
    //console.log("RES Status "  + res.status_list[numero].status)
   // console.log("RES Data "    + res.status_list[numero].data)
   // console.log("RES Local "   + res.status_list[numero].local)
   // console.log("RES Origem "  + res.status_list[numero].origem)
  //  console.log("RES Destino " + res.status_list[numero].destino)
 //   console.log("");

    return res;
}).then(data =>
  {
    if (data.status_list.length === 0) {
      console.log("Não há dados disponíveis na lista de status.");   
   grava("Sem informações por enquanto!",0,"Aguarde algumas horas",0);

  } else {
    
    const ultimoStatus = (data.status_list.length) - 1;
    console.log("length ======  " + ultimoStatus)
    var grav = data.status_list[ultimoStatus].status;
    var dt = data.status_list[ultimoStatus].data;
    var dest = data.status_list[ultimoStatus].destino;
    var dtOld = data.status_list[0].data;
   console.log("INDO GRAVAR ");
 

   grava(grav,dt,dest,dtOld);
  }
  })


  async function grava (rec = 0,dt = 0,dest = 0,dtOld = 0){
    console.log("gravando... ")
    const userLogado = req.session.userLogged;
  

  const novoPacote = await Pacote.create({
    nome: req.body.nome,
    codigo: req.body.codigo,
    data: dt, 
    hora: horas + ":" + minutos,
    status: rec,
    idUsuario:userLogado.idUsuario,
    alterado:"0",
    destino:dest,
    dataOld:dtOld
  }) 
  console.log(novoPacote);

  res.redirect('/');
}
});

module.exports = router;
