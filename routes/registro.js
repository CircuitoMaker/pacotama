var express = require('express');
var router = express.Router();
const database = require('../models/db');
const usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de saltos para fortalecer o hash

/* post home page. */
router.post('/', async function (req, res, next) {
//const teste = req.body.nome;
//console.log(teste);

// salva a senha criptografada
//const hash = await bcrypt.hash(req.body.senha, 10);


const saltRounds = 10; // Número de saltos a serem aplicados

const password = req.body.senha;
let hashPass="";

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error('Erro ao criar hash:', err);
    } else {
        console.log('Hash gerado:', hash);
       hashPass = hash;
        // Agora você pode armazenar o hash em um banco de dados ou em outro local seguro
    }
});



 //criando os produtos (inserindo produtos na tabela)
const novoUsuario = await usuario.create({
  nome: req.body.nome,
  email: req.body.email,
  foto: 'sem foto',
  senha: hashPass,
  pacotes: '0',
  admin:'0'
}) 

//console.log('A NOVO USUARIO É ' + novoUsuario);

  res.send("Cadastrado!");//('cadastro', { title: 'Cadastro'});
});

module.exports = router;
