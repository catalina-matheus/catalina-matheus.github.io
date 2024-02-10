let contadorTurnos = 0; 
let numSeleccionados =[]; 

// generar el número aleatorio:

// boton_agregar.addEventListener("click", guardarUsuarios); 
botonSacarNum.addEventListener("click", elegirNumAleatorio); 
function elegirNumAleatorio(){
    var numAleatorio =  Math.floor(Math.random()*50)+1;
    while(numSeleccionados.includes(numAleatorio)){
        numAleatorio =  Math.floor(Math.random()*50)+1; 
    }
    let parrafo = document.getElementById("numeroSacado"); 
    parrafo.textContent = `Número sacado: ${numAleatorio}`; 
    numSeleccionados.push(numAleatorio); 


    console.log(numAleatorio);
    
}

