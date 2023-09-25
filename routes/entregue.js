var express = require('express');
var router = express.Router();
const database = require('../models/db');
const Pacote = require('../models/pacote');



/* post home page. */
router.post('/', async (req, res, next)=> {
  
const alterar = req.body.id 
console.log('Alterando O ID => ' + alterar + ' <= Para entregue!')
const altera = await Pacote.findByPk(alterar); 
altera.status = 'Objeto entregue ao destinatário';
await altera.save();

//res.send("Muda status para entregue");
  res.redirect('/');
  //res.render('cadastro', { title: 'Cadastro'});
});

module.exports = router;
