
var cartas = new Array( 
  {nombre: '1', seleccion: false}, {nombre: '2', seleccion: false}, 
  {nombre: '3', seleccion: false}, {nombre: '4', seleccion: false}, 
  {nombre: '5', seleccion: false}, {nombre: '6', seleccion: false}, 
  {nombre: '7', seleccion: false}, {nombre: '8', seleccion: false}, 
  {nombre: '1', seleccion: false}, {nombre: '2', seleccion: false}, 
  {nombre: '3', seleccion: false}, {nombre: '4', seleccion: false}, 
  {nombre: '5', seleccion: false}, {nombre: '6', seleccion: false}, 
  {nombre: '7', seleccion: false}, {nombre: '8', seleccion: false});
//Definimos las variables	
var intentos = 0;
var jugada1 = "";
var jugada2 = "";
var identificadorJ1 = "";
var identificadorJ2 = "";



//Funcion que se activa al oprimir iniciar juego
function iniciarJuego () {	
//Creamos la variable dato que recibe del HTML el elemento de Tablero.
var dato = document.getElementById("tablero");
//Le damos un opaco fuerte para que se vea
dato.style.opacity = 1;
//Cambiamos el orden de las cartas
cartas.sort(function() {return Math.random() - 0.5;});
//Entramos en el ciclo y enviamos los valores que tienen las cartas al index
for ( var i = 0 ; i < 16 ; i++ ) {
    var carta = cartas[i].nombre;
    var datoh = document.getElementById( i.toString() );
    datoh.dataset.valor = carta;
  }
}

//***************************************
function resetearJuego () {
   intentos=0;
  document.getElementById("try").innerHTML = intentos;
  cartas.sort(function() {return Math.random() - 0.5;});
  for ( var i = 0 ; i < 16 ; i++ ) {
    var carta = cartas[i].nombre;
    var dato = document.getElementById( i.toString() );
    dato.dataset.valor = carta;
    colorCambio( i, 'yellow', '?');

  }	
}

function girarCarta () {
//Esta variable obtiene lo que haya clickeado la pantalla
  var evento = window.event;
  jugada2 = evento.target.dataset.valor;
  identificadorJ2 = evento.target.id;
//Miramos si es el primer o segundo turno (Si es el primero la jugada 1 estara vacia)
  if ( jugada1 !== "" ) {
//Si las cartas son iguales pero no es la misma posicion es decir tienen el mismo valor pero no es la misma posicion
    
    
//   Evita que se volteen las cartas ya emparejadas --->  && document.getElementById(identificadorJ2).innerHTML !== "☑" 
    
    
//********Este caso es en el que el usuario acierta*************
    if ( jugada1 === jugada2 && identificadorJ1 !== identificadorJ2 && 
    cartas[parseInt(identificadorJ2)].seleccion !== true &&cartas[parseInt(identificadorJ1)].seleccion !== true && document.getElementById(identificadorJ2).innerHTML !== "☑") {

      //Ponemos la selccion se las cartas en verdadero
      cartas[parseInt(identificadorJ1)].seleccion = true;
      cartas[parseInt(identificadorJ2)].seleccion = true;
	evento.target.onclick = "";
      
//Le pasamos el valor que ira seteado en la tarjeta
      colorCambio(identificadorJ2, "green",  "☑");
      colorCambio(identificadorJ1, "green",  "☑");
      
//Vaciamos los valores de la jugada
      vaciar();
	intentos= intentos + 1;
	

  document.getElementById("try").innerHTML = intentos;

//Miramos si ya se acabo el juego
      comprobar();
      
    }


//*************Caso en el que se seleccionen las 2 pero este equivocado *************
    else if(identificadorJ1 !== identificadorJ2 && document.getElementById(identificadorJ2).innerHTML !== "☑"){
      var self = this;
//Se da un tiempo para que el usuario alcance a memorizar los numeros que eligio 
      setTimeout(function(){
        colorCambio(self.identificadorJ1, "red", "x");
        colorCambio(self.identificadorJ2, "red", "x");
        vaciar();
	intentos=intentos+1;
  document.getElementById("try").innerHTML = intentos;

      },250); 

      colorCambio(identificadorJ2, "blue", jugada2);
    }
  } 
  
  
  
  
//*************Caso en el que sea hasta ahora el primer turno *************
else if(jugada2 !== "valor" && document.getElementById(identificadorJ2).innerHTML !== "☑") {
    colorCambio(identificadorJ2, "blue", jugada2);
    jugada1 = jugada2;
    identificadorJ1 = identificadorJ2;
  }

}

//Inicializa de nuevo para un nuevo tiro
function vaciar ()  {
  jugada1 = "";	
  jugada2 = "";	
  identificadorJ1 = "";
  identificadorJ2 = "";
}

//Cambiamos el color de las tarjetas que se envien
function colorCambio (posicion, color, contenido) {

  document.getElementById(posicion.toString()).style.backgroundColor = color;

  document.getElementById(posicion.toString()).innerHTML = contenido;

}	
//Se comprueba si ya se acertaron todas las 16 cartas ya han sido seleccionadas
function comprobar () {
  var aciertos = 0;

  for( var i = 0 ; i < 16 ; i++ ){
    if ( cartas[i].seleccion === true ) {
      aciertos ++;
    }
  }
//Si ya se seleccionan todas las cartas entonces se toma el tablero y se cambia por un mensjae de ganaste
  if(aciertos === 16){

    tab=document.getElementById("tablero");    
    tab.innerHTML = "Ganaste con un total de " + intentos + " intentos";
  }
  

}

