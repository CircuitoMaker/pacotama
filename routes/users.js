var express = require('express');
var router = express.Router();
const database = require('../models/db');
const usuario = require('../models/Usuario');
const verificaAutenticacao = require('../public/middlewares/verificaAutenticacao'); // Importe o middleware
const verificaAdmin = require('../public/middlewares/verificaAdmin'); // Importe o middleware
const sequelize = require('sequelize');
const Pacote = require('../models/pacote'); // Importe o modelo de pacote
const { Op } = require('sequelize'); // Importe o operador do Sequelize

/* GET home page. */
router.get('/',verificaAutenticacao,verificaAdmin, async function(req, res, next) {
 
  var users;
 
      let logado = userLogado.nome;
      let numeroDePacotes = [];

        try {
           users = await usuario.findAll();
           const usersWithPackageCounts = [];

           for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const contador = await Pacote.count({
              where: {
                idUsuario: user.idUsuario,
                status: {
                  [sequelize.Op.not]: 'Objeto entregue ao destinatário'
                }
              }
            });
        

            usersWithPackageCounts.push(contador);
            numeroDePacotes = usersWithPackageCounts;
          }
      
        } catch (error) {
          console.error('Erro:', error);
          throw error;
        }
      

      
      console.log("Numero de pacotes = " + numeroDePacotes[1]);
    

 res.render('users', { title: 'Users', users, logado, numeroDePacotes});
});

module.exports = router;
