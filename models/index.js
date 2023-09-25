(async()=> {

    // criando as tabelas - 
    const database = require('../models/db');
    const Usuario = require('../models/Usuario');
    const Pacote = require('../models/pacote');
    const sequelize = require('sequelize');

   // await database.sync({force:true});// refaz o banco
    await database.sync();

    // testa se o banco esta ativo ou inativo
   
   
    try {
        await database.sync();
        await sequelize.authenticate();
        console.log('CONECTADO AO BANCO!');
      }catch (err){
        console.log('        ');
        console.log('********************');
        console.log('Sem Conexao com o BD');
        console.log('********************');
        console.log('        ');
      }

     

// criando os produtos (inserindo produtos na tabela)


/*

//FABRICANTE
const novoUsuario = await Usuario.create({
  nome: 'Moacir',
  email: 'moacir@mail.com',
  foto: 'imagem33.jpg',
  senha: 'senha'
}) 
*/
/*
//PRODUTO
const novoPacote = await Pacote.create({
  nome: 'AMAZON',
  codigo: 'Limão',
  data: '14/06/2023',
  hora: '21:09h',
  status: 'Pacote ROUBADO!',
  idUsuario:1// novoUsuario.idUsuario
})

//console.log('A NOVO USUARIO É ' + novoUsuario);
*/


//const user = await Usuario.findByPk(1,{include:Pacote});
//console.log("IMPRIMINDO DADOS DO PACOTE " + user.Pacotes[2].nome);



/*

const novoPacote = await pacote.create({
  nome: 'shopee',
  codigo: 'qk123456789br',
  data: dia + "/" + mes + "/" + ano,
  hora: horas + ":" + minutos,
  status: 'Saiu para a ENTREGA!'
}) 
*/


//const user = await usuario.findByPk(1);
//const pacotes =  await usuario.getpacotes();

//console.log(pacotes);

//Lendo dados do banco
//traz todos os elementos da tabela
//const recebe = await usuario.findAll();
//console.log(recebe[0].nome);
//return recebe

//traz apenas os produtos com o ID selecionado
//const recebe = await musica.findByPk(1); 

//filtra produto por algum atributo
/*
const recebe = await usuario.findAll({
    where:{
nome:'moacir'
    }
}); 

console.log(recebe[0].pacotes);
*/

/*
// atualizando um produto
//antes temos que fazer a busca do produto pelo ID
const altera = await musica.findByPk(2); 
altera.nome = 'Stalone';
await altera.save();


//deletando produtos
const deleta = await musica.findByPk(2); 
deleta.nome = 'Stalone';
await deleta.destroy();
*/

})();