var express = require('express');
var router = express.Router();
const database = require('../models/db');
const Pacote = require('../models/pacote');
const Usuario = require('../models/Usuario');



/* post home page. */
router.post('/', async (req, res, next)=> {

const deletar = req.body.id


const usuarioParaExcluir = await Usuario.findByPk(deletar, {
  include: Pacote
});

if (usuarioParaExcluir) {
  const pacotesAExcluir = usuarioParaExcluir.Pacotes;

  for (const pacote of pacotesAExcluir) {
    await pacote.destroy();
  }

  // Após excluir os pacotes, você pode excluir o usuário
  await usuarioParaExcluir.destroy();
} else {
  console.log("Usuário não encontrado.");
}


  res.redirect('/users');
  //res.render('cadastro', { title: 'Cadastro'});
});

module.exports = router;
