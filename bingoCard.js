var puntajes = []

// tenemos que agarrar primero el tamaño de la matriz del localstorage: 
const tamanioString = localStorage.getItem('tamaño'); 
// lo convertimos a numero: 
let tamanio; 
if(!isNaN(tamanioString)){
    tamanio = Number(tamanioString);  
}
var matriz1 = []; //matriz del jugador 1
var matriz2=[]; //matriz del jugador 2
var matriz3= []; //matriz del jugador 3
var matriz4= []; //matriz del jugador 4

// llenamos todas las matrices: 
crearMatriz(matriz1); 
crearMatriz(matriz2);
crearMatriz(matriz3);
crearMatriz(matriz4);


botonSacarNum.addEventListener("click", pintarMatriz(matriz1));
document.getElementById("boton1").style.backgroundColor = "rgb(178, 196, 203)"; 

//inicializamos la lista de objetos: 
inicializarPuntajes(); 

// para inicializar el contador de puntajes de los jugadores: 
function inicializarPuntajes(){
    const usuariosJSON = localStorage.getItem('usuarios'); 
    if(usuariosJSON){
        const usuarios = JSON.parse(usuariosJSON); 
        for(const usuario of usuarios){
            let objetoUsuario = {
                username: usuario,
                puntaje: 0
            }; 
            puntajes.push(objetoUsuario); 

        }
    }
}
// hace el conteo de números
function reconteoPuntos(matriz){
    const numerosSeleccionadosJSON = localStorage.getItem('numerosSeleccionados'); 
    let numerosSeleccionados=[]; 
    numerosSeleccionados = JSON.parse(numerosSeleccionadosJSON);

}

// hace el conteo de puntos para línea horizontal: 
function conteoHorizontal(matriz, numerosSeleccionados){
    let puntosObtenidos = 0; 
    matriz.forEach(fila=>{
        const numerosEnFila = fila.every(numero => numerosSeleccionados.includes(numero)); 
        if(numerosEnFila.length>0){
            puntosObtenidos++; 
        }
    })
    return puntosObtenidos; 
}


// funcion para hacer el conteo de puntos para linea vetical
//retorna el puntaje
function conteoVertical(matriz, numerosSeleccionados){
    let puntosObtenidos = 0; 

    for(let columna = 0; columna<tamanio; columna++){
        let todosEnColumna = true; 

        for(let fila = 0; fila<tamanio; fila++){
            
                if(!numerosSeleccionados.includes(matriz[fila][columna])){
                    todosEnColumna = false;
                    break;  
                }
            }
            if(todosEnColumna){
                puntosObtenidos++; 
            }
        }
    return puntosObtenidos; 
}

// funcion para realizar el conteo de puntos de línea diagonal 
// retorna el puntaje
function conteoDiagonal(matriz, numerosSeleccionados){
    let puntosObtenidos = 0;

    let todosEnDiagonalPrincial = true; 
    let todosEnDiagonalSecundaria = true;

    for(let i = 0; i< tamanio; i++){
        const numeroEnDiagonalPrincipal = matriz[i][i]; 
        const numeroEnDiagonalSecundaria = matriz[i][tamanio-i-1]; 
        if(!numerosSeleccionados.includes(numeroEnDiagonalPrincipal)){
            todosEnDiagonalPrincial = false; 
        }
        if(!numerosSeleccionados.includes(numeroEnDiagonalSecundaria)){
            todosEnDiagonalSecundaria = false; 
        }
    }
    if(todosEnDiagonalPrincial){
        puntosObtenidos +=3; 
    }
    if(todosEnDiagonalSecundaria){
        puntosObtenidos +=3; 
    }
    return puntosObtenidos; 
}

// funcion que revisa si el cartón está lleno 
// retorna un bool 
function revisarCartonLleno(matriz, numerosSeleccionados){
    for(let fila of matriz){
        for(let numero of fila){
            if(!numerosSeleccionados.includes(numero)){
                return false; 
            }
        }
    }
    return true; 
}


// función para crear la matriz: 
function crearMatriz(matriz){
    // primero creamos una matriz vacía de tamanioxtamanio: 
    for(let i=0; i<tamanio; i++){
        matriz[i]=[]; 
    }
    //se empieza a llenar la matriz de forma ordenada: 
    for(let fila = 0; fila<tamanio; fila ++){
        for(let columna=0; columna<tamanio; columna++){
            let numeroAleatorio; 
        
        do{
            numeroAleatorio = Math.floor(Math.random()*50)+1; 
        }while(existe(matriz,numeroAleatorio)); // mientras el numero exista se genera un numero nuevo
        matriz[fila][columna]=numeroAleatorio; 
        }
    }      
    
}
// para revisar si existe en la matriz el número aleatorio
function existe(matriz, num){
    for(let fila = 0; fila<matriz.length; fila++){
        for(let columna = 0; columna<matriz[fila].length;columna++){
            if(matriz[fila][columna]===num){
                return true; 
            }
        }
    }return false; 
}

// funcion para pintar la matriz: 
function pintarMatriz(matriz){
    const container= document.getElementById('contenedorBingoCard'); 
    container.innerHTML = ''; 
    

    for(let fila= 0; fila<tamanio; fila++){
        const filaElemento = document.createElement('div'); 
        filaElemento.classList.add('matrizfila'); 
        const numerosSeleccionadosJSON = localStorage.getItem('numerosSeleccionados'); 
        let numerosSeleccionados=[]; 
        numerosSeleccionados = JSON.parse(numerosSeleccionadosJSON);

        for(let columna = 0; columna<tamanio; columna++){
            const numero = matriz[fila][columna]// para guardar el numero que tengo que escribir en el cuadrado
            const cuadrado = document.createElement('div'); 
            cuadrado.classList.add('matrizcuadrado'); 
            if(numerosSeleccionados.includes(numero)){
                cuadrado.style.backgroundColor = "rgb(167, 126, 133)"; 
                cuadrado.style.color = "darkgray"; 
            }
            cuadrado.textContent = numero; 
            
            filaElemento.appendChild(cuadrado); 
            
        }
        container.appendChild(filaElemento); 
    }
}
// para cuando se selecciona un jugador se vea su tablero: 
const btn1 = document.getElementById("boton1"); 
const btn2 = document.getElementById("boton2");
const btn3 = document.getElementById("boton3");  
const btn4 = document.getElementById("boton4"); 

document.getElementById("boton1").addEventListener("click",function(){
    pintarMatriz(matriz1);
    this.style.backgroundColor = "rgb(178, 196, 203)"; 
    btn2.style.backgroundColor = "rgb(167, 126, 133)"; 
    btn3.style.backgroundColor = "rgb(167, 126, 133)"; 
    btn4.style.backgroundColor = "rgb(167, 126, 133)"; 

})
document.getElementById("boton2").addEventListener("click",function(){
    pintarMatriz(matriz2);
    this.style.backgroundColor = "rgb(178, 196, 203)";
    btn1.style.backgroundColor = "rgb(167, 126, 133)"; 
    btn3.style.backgroundColor = "rgb(167, 126, 133)";  
    btn4.style.backgroundColor = "rgb(167, 126, 133)"; 
})
document.getElementById("boton3").addEventListener("click",function(){
    pintarMatriz(matriz3);
    this.style.backgroundColor = "rgb(178, 196, 203)";
    btn1.style.backgroundColor = "rgb(167, 126, 133)"; 
    btn2.style.backgroundColor = "rgb(167, 126, 133)"; 
    btn4.style.backgroundColor = "rgb(167, 126, 133)"; 
})
document.getElementById("boton4").addEventListener("click",function(){
    pintarMatriz(matriz4);
    this.style.backgroundColor = "rgb(178, 196, 203)";
    btn1.style.backgroundColor = "rgb(167, 126, 133)";  
    btn2.style.backgroundColor = "rgb(167, 126, 133)"; 
    btn3.style.backgroundColor = "rgb(167, 126, 133)"; 
})


// contador de puntos: 



