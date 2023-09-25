const Sequelize = require('sequelize');
const database = require('../models/db');

//FABRICANTE
const Usuario = require('../models/Usuario');

//PRODUTOS
const Pacote = database.define('Pacote',{
  
    idPacote: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    
    nome: {
      type: Sequelize.STRING,
      allowNull: false
    },

    codigo: {
      type: Sequelize.STRING,
      allowNull: false
    },

    data: {
      type: Sequelize.STRING,
      allowNull: true
    },

    hora: {
      type: Sequelize.STRING,
      allowNull: true
    },

    status: {
      type: Sequelize.STRING,
      allowNull: true
    },

    alterado: {
      type: Sequelize.STRING,
      allowNull: false
    },

    destino: {
      type: Sequelize.STRING,
    },
    dataOld: {
      type: Sequelize.STRING,
    }
    
});

Pacote.belongsTo(Usuario,{
  constraint:true,
  foreignKey:'idUsuario'
})

Usuario.hasMany(Pacote,{
  foreignKey:'idUsuario'
})

//"PRODUTO"
module.exports = Pacote;