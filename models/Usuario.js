const Sequelize = require('sequelize');
const database = require('./db');


//FABRICANTE
const Usuario = database.define('Usuario',{
  
    idUsuario: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    
    nome: {
      type: Sequelize.STRING,
      allowNull: false
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false
    },


    foto: {
      type: Sequelize.STRING,
      allowNull: false
    },
 

    senha: {
      type: Sequelize.STRING,
      allowNull: false
    },

    admin: {
      type: Sequelize.STRING,
      allowNull: false
    }
  
});


//FABRICANTE
module.exports = Usuario;