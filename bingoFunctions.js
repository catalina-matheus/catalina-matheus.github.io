let contadorTurnos = 0; // para llevar la cuenta de los turnos
let numSeleccionados =[]; // lista con los números que ya se han sacado (para no repetir)

// generar el número aleatorio:

// boton_agregar.addEventListener("click", guardarUsuarios); 

botonSacarNum.addEventListener("click", elegirNumAleatorio); // cuando se haga click en el botón se saca el num
// función que saca un número aleatorio y revisa que no se repita y le suma al contador de turnos
function elegirNumAleatorio(){
    var numAleatorio =  Math.floor(Math.random()*50)+1;
    while(numSeleccionados.includes(numAleatorio)){
        numAleatorio =  Math.floor(Math.random()*50)+1; 
    }
    let parrafo = document.getElementById("numeroSacado"); 
    parrafo.textContent = `Número sacado: ${numAleatorio}`; 
    numSeleccionados.push(numAleatorio); 
    // le sumamos al contador de turnos:
    contadorTurnos++;  
    // mostramos el contador en la vista: 
    let cont = document.getElementById("contador"); 
    cont.value = contadorTurnos; 
    console.log(numAleatorio);
}

// función para generar el tablero: 
