const Sequelize = require('sequelize');
// const sequelize = new Sequelize('railway','root','iSceV4Y9ddj2hYP92RF9',{
//     host:'containers-us-west-78.railway.app',
//     dialect:'mysql',
//     port:6099
// })


const sequelize = new Sequelize('dbtest','admin','Lipe2711',{
    host:'pacotama-db1.cvk7zq60hyhi.us-east-1.rds.amazonaws.com',
    dialect:'mysql',
    port:3306
})


module.exports = sequelize;