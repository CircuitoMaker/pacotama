var express = require('express');
var router = express.Router();
const database = require('../models/db');
const usuario = require('../models/Usuario');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

/* GET home page. */
router.post('/', async(req, res, next)=>{

  const recebeEmail = req.body.email;
  const recebeSenha = req.body.senha;
  var recebe
  
// testa se existe conexão com o banco
  try {
     recebe = await usuario.findAll({
      where:{
  email: recebeEmail
      }
    })
    } catch (error) {
      console.log("NAO RECEBI NADA !!!")
      return res.redirect('/login/erro2');
    }




 let verificaEmail = false;
 let verificaSenha = false;

 //console.log(recebe);

 if(recebe != ""){

  if(recebe[0].email == recebeEmail){
    console.log("O email Passou!");
    verificaEmail = true;
  }else{
    console.log("O email nao Passou!");
  }

  const senhaDigitada = recebeSenha;
  const senhaCorreta = await bcrypt.compare(senhaDigitada, recebe[0].senha );

  // se a senha coincidir, efetua o login
  if(senhaCorreta == true){
  console.log("A senha Passou!");
  verificaSenha = true;
}else{
  console.log("A senha nao Passou!");
}

 }


if(verificaEmail == true && verificaSenha == true){
  console.log("Logado!");
  req.session.userLogged = recebe[0];
 return res.redirect('/'); //index
}else{
  console.log("Nao Logado!");

  return res.redirect('/login/erro1');
}


  //console.log(recebe[0].nome);


  
//console.log(" verifica login ");
//console.log(req.body.email);
//console.log(req.body.senha);

  res.send("verifica Login");
});

module.exports = router;
