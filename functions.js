const boton_agregar = document.getElementById("boton-comenzar")
const usernamesGames = []; 
let contador = 0; 
let name1 =""; 
let name2 =""; 
let name3 =""; 
let name4 =""; 
// let tamanio=0; 
// console.log(boton_agregar);
// boton_agregar.addEventListener("click", guardarUsuarios); 

function guardarUsuarios(e){
    e.preventDefault(); 
    name1 = document.getElementById("nombre1").value;  
   name2= document.getElementById("nombre2").value; 
   name3 = document.getElementById("nombre3").value; 
   name4 = document.getElementById("nombre4").value; 
   const tamanio = document.getElementById("tamaniotabla").value;
   if(name1.length>8 || name2.length>8 || name3.length>8 || name4.length>8){
    alert("Los usernames deben tener un máximo de 6 caracteres."); 
   } 
   else if(name1 !=="" && name2 !=="" && name3 !=="" && name4 !==""){
        // usernamesGames.push(name1); 
        // usernamesGames.push(name2); 
        // usernamesGames.push(name3); 
        // usernamesGames.push(name4); 
        usernamesGames[0]=name1; 
        usernamesGames[1]=name2;
        usernamesGames[2]=name3;  
        usernamesGames[3]=name4; 
        // guardamos los usuarios en el localstorage: 
        let usernamesJSON = JSON.stringify(usernamesGames); 
        localStorage.setItem('usuarios', usernamesJSON);
        //guardamos el tamaño en el local storage: 
           localStorage.setItem("tamaño", tamanio); 
        //abrimos donde están las tarjetas del bingo:
        window.location.replace("bingo.html");
        cambiarBotones(); 
   }else if(name1 =="" && name2 =="" && name3 =="" && name4 ==""){
    alert("Debe colocar todos los nombres");
   }
 

}


