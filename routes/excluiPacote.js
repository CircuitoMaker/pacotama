var express = require('express');
var router = express.Router();
const database = require('../models/db');
const Pacote = require('../models/pacote');



/* post home page. */
router.post('/', async (req, res, next)=> {
  
const deletar = req.body.id
console.log('EXCLUINDO O ID = ' + deletar)
const deleta = await Pacote.findByPk(deletar); 
deleta.idPacote = deletar;
await deleta.destroy();

//res.send("Exclui Pacote")
  res.redirect('/');
  //res.render('cadastro', { title: 'Cadastro'});
});

module.exports = router;
