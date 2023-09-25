const entrada = document.getElementById('entrada');
const enviar = document.getElementById('btnEnviar');
const pisca = document.getElementById('pisca');
const labelIn = document.getElementById('labelIn');
const palavra = document.getElementById('palavra');

pisca.style.backgroundColor = "#000000";

let inverte =  false;


async function botao(){



const dados = entrada.value;


for(let i=0; i<dados.length; i++){
   
    palavra.innerHTML = dados;
    palavra.style.backgroundColor = "#ff0000";

const aux = dados[i].charCodeAt(0);

const bin = byteString(aux);
labelIn.innerHTML = bin;



for(let x=0; x<8; x++){

if(bin.charAt(x) == '1'){
    pisca.style.backgroundColor = "#ffffff";
}else{
    pisca.style.backgroundColor = "#000000";
}
//pausa
await sleep(70);
}// fim do for


//deixa em LOW
pisca.style.backgroundColor = "#000000";
await sleep(100);

}//fim do for 2

}// fim da function








async function dorme(){
    await sleep(10);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


function byteString(n) {
    if (n < 0 || n > 255 || n % 1 !== 0) {
        throw new Error(n + " does not fit in a byte");
    }
    return ("000000000" + n.toString(2)).substr(-8)
  }





/*

setInterval(myTimer, 200);


function myTimer(){
  
if(inverte == true){
    pisca.style.backgroundColor = "#000000";
}else{
    pisca.style.backgroundColor = "#ffffff";
}
inverte = ! inverte
} 

*/