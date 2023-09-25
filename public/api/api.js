const path = require('path');
const correios = require('correios-rastreamento');
const nodemailer = require('nodemailer');
const diretorioAtual = __dirname;
const diretorioPai = path.resolve(diretorioAtual, '..');
const diretorioAvo = path.resolve(diretorioPai, '..');
const Usuario = require (path.join(diretorioAvo, 'models/Usuario'));
const Pacote = require (path.join(diretorioAvo, 'models/pacote'));
const sequelize = require('sequelize');
const chalk = require('chalk');

/* exemplos de texto em cores
console.log(chalk.green('Hello world!'));
console.log(chalk.red('Este é um texto em vermelho'));
console.log(chalk.blue.bold('Este é um texto em azul e em negrito'));
console.log(chalk.green.bgYellow('Este é um texto em verde com fundo amarelo'));
*/

var contaVolta = 0;
var intervalo = 0//300000;
var flagDeInicio =  false;


var myVar = setInterval(myTimer, 3000000); // a cada 5 minutos = 20 vezes por hora
//setInterval(myTimer, 20000); // 20 segundos para testes
//setInterval(myTimer, 5000); // 5 segundos para testes



function myTimer(){

  if(flagDeInicio == false){
    intervalo = 300000;
    flagDeInicio = true;
    // limpa o intervalo inicial e reinicia o timer com o novo valor de intervalo
    //clearInterval(myVar);
   // var myVar = setInterval(myTimer, intervalo);
    }

console.log("Flag de inicio " + flagDeInicio);
console.log("intervalo == " + intervalo);

var dataAtual = new Date();
var dia = dataAtual.getDate();
var mes = (dataAtual.getMonth() + 1);
var ano = dataAtual.getFullYear();
var horas = dataAtual.getHours();
var minutos = dataAtual.getMinutes();


    console.log(" ");
    console.log("¨¨¨¨¨¨¨¨¨ "+ dia + "/" + mes + "/" + ano + " - " + horas + ":" + minutos + "h"+" ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨  API " + contaVolta + " VEZES ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨");
    console.log(" ");
    contaVolta++;

if(contaVolta == 10000){
    //Limpa a variável a cada 5 dias +-
    contaVolta = 0;
    //limpa o console
    console.clear();
}
    rastreia();

}// fim da funçao 



async function rastreia(){

const volumeDB = await Usuario.findAll();
const quantidadeUsers = volumeDB.length;


//VARRE os usuarios cadastrados no banco
for(var index = 0; index < quantidadeUsers; index++){

 const idUserAtual = volumeDB[index].idUsuario;
 const emailUserAtual = volumeDB[index].email;
 const nomeUserAtual = volumeDB[index].nome; 

//const user = await Usuario.findByPk(idUserAtual,{include:Pacote});

//filtra as buscas no banco para não trazer pacotes que ja foram entregues  
const user = await Usuario.findByPk(idUserAtual, {
    include:{
      model: Pacote,
      where: {
        status: {
          [sequelize.Op.not]: 'Objeto entregue ao destinatário'
        }
      }
    }
  });



let conteudo;
let qtdPacotes;

if (user && user.Pacotes) {
     conteudo = user.Pacotes;
     qtdPacotes = conteudo.length;
}else{
    qtdPacotes = 0;
}



//Printa dados do usuário
console.log("  ");
console.log("*** Usuário Indice: "+ index + " - ID: " + idUserAtual + " - Nome: " + nomeUserAtual + " - Possui: " + qtdPacotes + " Pacotes ***");
console.log("  ");

//VARRE os PACOTES de cada usuário
for(var x=0; x < qtdPacotes; x++){

const stsDtBanco = conteudo[x].data;
const codPacoteAtual = conteudo[x].codigo;
const nomePacoteAtual = conteudo[x].nome;
const stsPacoteAtual = conteudo[x].status;
//var destino = conteudo[x].destino;

var stsDtCorreios;
var ultimoCorreios;
var destino;

var erroNaBusca = false;
try{
    [stsDtCorreios,ultimoCorreios,destino] = await busca(codPacoteAtual);
}catch(error){
    console.log("Erro na busca! ",error);
    erroNaBusca = true;
    console.log(chalk.red(' ******* ERRO NA BUSCA VIA API CORREIOS ******* '));
}

// Imprime dados dos pacotes
console.log("Pacote " + x + ": " + "NOME: " + nomePacoteAtual +  " - Código: " + codPacoteAtual + " - Status Banco: " + stsDtBanco + " - Status Correios: " + stsDtCorreios);


if(stsDtCorreios == stsDtBanco){
console.log("Os Status são iguais! - Não faz nada.");
console.log("  ");
}else{

    if(erroNaBusca == false){

    console.log("Os Status são diferentes! - Envia Email.");
    
    //SALVA O NOVO STS NO BANCO 
    conteudo[x].data = stsDtCorreios;
    await conteudo[x].save();
    
    conteudo[x].status = ultimoCorreios;
    await conteudo[x].save();

    conteudo[x].destino = destino;
    await conteudo[x].save();

    
    conteudo[x].alterado = "1";
    await conteudo[x].save();

    console.log("Status do Pacote: " + x + " Atualizado no Banco!");

    console.log("  ");

    ultimoCorreios = ultimoCorreios.replace("Objeto","Pacote");
    ultimoCorreios = ultimoCorreios.replace(" - por favor aguarde"," para");

    // ENVIA EMAIL
   const transport = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{
        user:'esp32webserver@gmail.com',
        pass:'ojtdppliwrwrjozv',
    }
   });

  

   transport.sendMail({
    from:'PACOTAMA <esp32webserver@gmail.com>',
    to:emailUserAtual,
    subject:'PACOTAMA ' + nomePacoteAtual,
    html:'<h1> Olá '+ nomeUserAtual +' </h1> <p> Seu pacote <strong>' + nomePacoteAtual + '</strong> Atualizou o Status para:</p><p>' + ultimoCorreios + "</p><p>" + destino +'</p>',
    text:'',
   })
.then(()=> console.log(chalk.green.bgYellow('EMAIL ENVIADO COM SUCESSO!')))
.catch((err) => console.log ("Erro ao enviar email: ",err));
}

}// Fim do erro na busca
}// FIM do VARRE os PACOTES de cada usuario
}// fim do VARRE usuarios
}// fim do rastreio







async function busca(codigoPacoteAtual){

    try {
        const res = await correios.sroV2.rastrearObjeto(codigoPacoteAtual);
        const ultimoStatus = res.status_list.length - 1;
        const dt = res.status_list[ultimoStatus].data;
        const sts = res.status_list[ultimoStatus].status
        const dest =res.status_list[ultimoStatus].destino 
        return [dt,sts,dest];
        
      } catch (error) {
        console.error('Erro na busca:', error);
        throw error; // Rejeita a Promessa com o erro
      }
}