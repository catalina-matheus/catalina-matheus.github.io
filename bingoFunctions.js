
let contadorTurnos = 0; // para llevar la cuenta de los turnos
let numSeleccionados =[]; // lista con los números que ya se han sacado (para no repetir)

// guardamos en el localstorage: 
localStorage.setItem('numerosSeleccionados', JSON.stringify([]));  

// generar el número aleatorio:

// boton_agregar.addEventListener("click", guardarUsuarios); 
cambiarBotones(); 
botonSacarNum.addEventListener("click", elegirNumAleatorio); // cuando se haga click en el botón se saca el num
botonReiniciar.addEventListener("click", reiniciar); 
// función que saca un número aleatorio y revisa que no se repita y le suma al contador de turnos
function elegirNumAleatorio(){
    if(contadorTurnos+1 <=25){
        var numAleatorio =  Math.floor(Math.random()*50)+1;
        while(numSeleccionados.includes(numAleatorio)){
            numAleatorio =  Math.floor(Math.random()*50)+1; 
        }
        pintarCeldaActual(numAleatorio); 
        let parrafo = document.getElementById("numeroSacado"); 
        parrafo.textContent = `Número sacado: ${numAleatorio}`; 
        numSeleccionados.push(numAleatorio); 
        // le sumamos al contador de turnos:
        contadorTurnos++;  
        // mostramos el contador en la vista: 
        let cont = document.getElementById("contador"); 
        cont.value = contadorTurnos; 
        let numerosJSON = JSON.stringify(numSeleccionados); 
        localStorage.setItem('numerosSeleccionados', numerosJSON); 
        console.log(numAleatorio);
        if(revisarCartones()){
            alert("Hay un ganador!"); 
            guardarPuntos(); 
            mostrarGanador(); 
            mostrarReiniciar(); 
            actualizarHistorialPuntajes(); 
        }
    }else{
        alert("Ya no quedan más turnos!");
        guardarPuntos(); 
        mostrarGanador(); 
        mostrarReiniciar(); 
        actualizarHistorialPuntajes();

    }
    
}

// función que muestra el boton de reiniciar: 
function mostrarReiniciar(){
    let boton = document.getElementById("reiniciar"); 
    boton.style.display = "block"; 
}

// funcion para cambiar los botones (colocarles el nombre del participante)
function cambiarBotones(){

    const usuariosJSON = localStorage.getItem('usuarios'); 
    // verificamos que el arreglo existe y no está vacío: 
    if(usuariosJSON && usuariosJSON !=='[]'){
        const usuarios = JSON.parse(usuariosJSON); 
        document.getElementById("boton1").innerText = usuarios[0]; 
        document.getElementById("boton2").innerText = usuarios[1];
        document.getElementById("boton3").innerText = usuarios[2];
        document.getElementById("boton4").innerText = usuarios[3];
    } 
    
}

// función para mostrar ganador: 
function mostrarGanador(){
   
    const puntajesJSON = localStorage.getItem('puntosJuego'); 
 
    if(puntajesJSON && puntajesJSON !=="[]"){
        const puntajes = JSON.parse(puntajesJSON); 
        puntajes.sort((a,b)=>b.puntaje -a.puntaje);
        let puntajeMasAlto = puntajes[0].puntaje; 
        let parrafo = document.getElementById("ganador");
        let anuncio1 = document.getElementById("anuncioP1");
        let anuncio2 = document.getElementById("anuncioP2");
        let anuncio3 = document.getElementById("anuncioP3");
        let anuncio4 = document.getElementById("anuncioP4");
        let corazon = "\uD83D\uDC9E"; 
        let emojiCelebración = "\uD83C\uDF89";
        if(puntajeMasAlto === 0){
            let caritaTriste = "\uD83D\uDE22"; 
            parrafo.textContent = `No hay ganador ${caritaTriste}. Gracias por jugar ${corazon} `; 
            anuncio1.textContent = `${puntajes[0].username}: ${puntajeMasAlto}ptos`; 
            anuncio2.textContent = `${puntajes[1].username}: ${puntajeMasAlto}ptos`; 
            anuncio3.textContent = `${puntajes[2].username}: ${puntajeMasAlto}ptos`; 
            anuncio4.textContent = `${puntajes[3].username}: ${puntajeMasAlto}ptos`; 

            parrafo.style.color = "rgb(142, 142, 55)"; 
            // anuncio1.style.color = "rgb(99, 154, 99)";
            // anuncio2.style.color = "rgb(99, 154, 99)"; 
            // anuncio3.style.color = "rgb(99, 154, 99)"; 
            // anuncio4.style.color = "rgb(99, 154, 99)"; 
           
        }
        else if(puntajeMasAlto === puntajes[1].puntaje){
            parrafo.textContent = `Tenemos 2 ganadores ${emojiCelebración}. ¡Felicidades ${puntajes[0].username} y ${puntajes[1].username} con ${puntajeMasAlto} punto(s)! Gracias por jugar ${corazon}`; 
            anuncio1.textContent = `${puntajes[0].username}: ${puntajeMasAlto}`; 
            anuncio2.textContent = `${puntajes[1].username}: ${puntajes[1].puntaje}ptos`; 
            anuncio3.textContent = `${puntajes[2].username}: ${puntajes[2].puntaje}ptos`; 
            anuncio4.textContent = `${puntajes[3].username}: ${puntajes[3].puntaje}ptos`; 
            parrafo.style.color = "rgb(99, 154, 99)"; 
            // anuncio1.style.color = "rgb(99, 154, 99)";
            // anuncio2.style.color = "rgb(99, 154, 99)"; 
            // anuncio3.style.color = "rgb(99, 154, 99)"; 
            // anuncio4.style.color = "rgb(99, 154, 99)";  
        }
        else{
            parrafo.textContent = `Tenemos 1 ganador ${emojiCelebración}. ¡Felicidades  ${puntajes[0].username}! Tuviste ${puntajeMasAlto} puntos. Gracias por jugar ${corazon} `; 
            anuncio1.textContent = `${puntajes[0].username}: ${puntajeMasAlto}ptos`; 
            anuncio2.textContent = `${puntajes[1].username}: ${puntajes[1].puntaje}ptos`; 
            anuncio3.textContent = `${puntajes[2].username}: ${puntajes[2].puntaje}ptos`; 
            anuncio4.textContent = `${puntajes[3].username}: ${puntajes[3].puntaje}ptos`; 
            parrafo.style.color = "rgb(99, 154, 99)"; 
            // anuncio1.style.color = "rgb(99, 154, 99)";
            // anuncio2.style.color = "rgb(99, 154, 99)"; 
            // anuncio3.style.color = "rgb(99, 154, 99)"; 
            // anuncio4.style.color = "rgb(99, 154, 99)"; 
        }
        let listaPuntajesJSON = JSON.stringify(puntajes); 
        localStorage.setItem('puntosJuego', listaPuntajesJSON);  
        }
       
    
    }

    function reiniciar(){
        window.location.replace("index.html"); 
    }

