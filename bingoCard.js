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

pintarMatriz(matriz1); 

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
        matriz[fila][columna]=numeroAleatorio
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

        for(let columna = 0; columna<tamanio; columna++){
            const numero = matriz[fila][columna]// para guardar el numero que tengo que escribir en el cuadrado
            const cuadrado = document.createElement('div'); 
            cuadrado.classList.add('matrizcuadrado'); 
            cuadrado.textContent = numero; 
            filaElemento.appendChild(cuadrado); 
            
        }
        container.appendChild(filaElemento); 
    }
}

