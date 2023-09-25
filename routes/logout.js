var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  

  req.session.destroy((err)=>{
    if(err){
      console.log("Erro ao encerrar a sessao!", err);
    }else{
      console.log("Sessao encerrada com sucesso!");     
    }
  });
  
  res.clearCookie('userLogged');
  
  
  let erro;

  res.render('login', { title: 'LOGIN',erro});
});

module.exports = router;
