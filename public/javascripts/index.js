function testaCodigoENome(){
const codigo = document.getElementById('codigo');
const nomePacote = document.getElementById('nomePacote');
const errMsgCod = document.getElementById('errMsgCod');
const errMsgNome = document.getElementById('errMsgNome');

errMsgCod.hidden = true;
errMsgNome.hidden = true;

if(codigo.value.length < 13){
errMsgCod.hidden = false;
event.preventDefault();
}else{
    //if(codigo.value.substr(0, 2)){
    //implementar o teste na string 2 letras no inicio, numeros no meio, 2 letras no final  
    const maiuscula = codigo.value.toUpperCase();
        codigo.value = maiuscula;
    //}
}




if(nomePacote.value.length < 1){
    errMsgNome.hidden = false;
    event.preventDefault();
}



    
}