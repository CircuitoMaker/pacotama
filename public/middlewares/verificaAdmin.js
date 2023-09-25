// middleware/admin.js
function verificaAdmin(req, res, next) {
    if (req.session && req.session.userLogged) {
      // O usuário está logado e é ADMIN, tem acesso permitido à rota
    if(req.session.userLogged.admin == '1'){
      next();   
    }else{    
      res.redirect('/');
  }}}
  module.exports = verificaAdmin;
  