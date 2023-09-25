var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id?', function(req, res, next) {
const erro = req.params.id;

console.log("ERRO = " + erro)

  res.render('login', { title: 'LOGIN',erro});
});

module.exports = router;
