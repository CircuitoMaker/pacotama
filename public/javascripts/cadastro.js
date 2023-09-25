
function testaCampos(){

const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const msg = document.getElementById('MSGAlerta');

if(nome.value=="" || email.value=="" || senha.value==""){
    msg.hidden=false;
    event.preventDefault();
}




//preventDefault();
}