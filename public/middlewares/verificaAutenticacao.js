// middleware/auth.js

function verificaAutenticacao(req, res, next) {
    if (req.session && req.session.userLogged) {
      // O usuário está logado, permita o acesso à rota
      next();
    } else {
      // O usuário não está logado, redirecione para a página de login ou retorne uma resposta de erro
      let erro;
     // res.redirect('login',{ title: 'LOGIN',erro}); // ou res.status(401).send('Acesso não autorizado');
     res.render('login', { title: 'LOGIN',erro});
    }
  }
  

  module.exports = verificaAutenticacao;
  