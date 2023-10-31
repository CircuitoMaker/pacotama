const Sequelize = require('sequelize');
// const sequelize = new Sequelize('railway','root','iSceV4Y9ddj2hYP92RF9',{
//     host:'containers-us-west-78.railway.app',
//     dialect:'mysql',
//     port:6099
// })


const sequelize = new Sequelize('railway','root','iSceV4Y9ddj2hYP92RF9',{
    host:'containers-us-west-78.railway.app',
    dialect:'mysql',
    port:6099
})


module.exports = sequelize;