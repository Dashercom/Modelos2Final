
var canvas = document.getElementById('canvas');
var lapiz = canvas.getContext('2d');

var alt = 16;
var anc = 30;
var estado = 0; //0 jugando, 1 game over, 2 victoria
var casillasVistas = 0;  //Contador de casillas vistas

//Matriz de estados
var tablero = new Array(alt)
for (i = 0; i < anc; i++){
  tablero[i]=new Array(anc);
}

//Matriz de visibilidad
var visible = new Array(alt)
for (i = 0; i < anc; i++){
  visible[i]=new Array(anc);
}
//lapiz.fillStyle = 'green';
//lapiz.fillRect(0, 0, canvas.getAttribute('width'), canvas.getAttribute('height'));


//Inicializa el tablero
for (f = 0; f < 16; f++){
    for (c = 0; c < 30; c++){
        tablero[f][c] = 0;
        visible[f][c] = 0;
    }
}

//-------------------------------------------------------
crearTablero();
setInterval("pintar()",80); 
pintar();


canvas.addEventListener('click', coord);

function coord(event){
  var x = new Number();
  var y = new Number();
  var boton = new Number();

  var rect = canvas.getBoundingClientRect();

  if (event.x != undefined && event.y != undefined){

    x = event.x - rect.left;
    y = event.y - rect.top;
    boton = event.button;
    console.log("Coordenadas X:" + x +" Y:" + y + " Boton: " + event.button);
    botonPresionado(boton, x, y);
    pintar();
  }else{// Firefox
    x = event.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft;
    y = event.clientY + document.body.scrollTop +
        document.documentElement.scrollTop;
  }

}

//Metodo recibe el boton presionado y las coordenadas para ejecutar acciones
function botonPresionado(boton, x, y) {
  //Si el estado es jugando

    if (estado == 0){
        //Obtiene fila y columna pulsada
        var f = Math.trunc(y/30);
        var c = Math.trunc(x/30);

        console.log("Recibe x:" + f + " y:" + c);
        if (boton == 0){
          console.log("Algo");
            if (visible[f][c] == 0){
                if (tablero[f][c] == 9){
                    //Si pulsa una mina acaba la partida
                    gameOver();
                }else{
                    //Si pulsa un terreno lo visualiza ejecutando una funcion recursiva
                    clicCasilla(f,c);
                }
            }
        }else if (boton == 1){
            if (visible[f][c] == 0){
                visible[f][c] = 2;//coloca una bandera
            }else if (visible[f][c] == 2){
                visible[f][c] = 0;//Quita una bandera
            }
        }
    }else{
        crearTablero();
    }
}

//Metodo que verifica la casilla pulsada y ejecuta procedimientos segun sea adecuado
function clicCasilla(f, c){
    //Si la casilla esta tapada
    if (visible[f][c] == 0){
        //Descubre la casilla
        visible[f][c] = 1;
        casillasVistas++;
        if (casillasVistas == 381){
            //Si llega a las 381 casillas descubiertas gana
            victoria();
        }else{
            //Si no hay minas cercanas
            if (tablero[f][c] == 0){
                //Recorre las casillas cercanas y tambien las ejecuta
                for (var f2 = max(0, f-1); f2 < min(alt,f+2); f2++){
                    for (var c2 = max(0,c-1); c2 < min(anc,c+2); c2++){
                        clicCasilla(f2, c2);
                    }
                }
            }
        }
    }
    //System.out.println("Vistas = " + casillasVistas);
}

function pintar(){

  var tam = 30;
  // Pinta las casillas
  for (f = 0; f < alt; f++) {
  	for (c = 0; c < anc; c++) {
  		var x = c * tam;
  		var y = f * tam;
      //canvas.beginPath();
  		if (visible[f][c] == 0 && estado == 0) {
  			lapiz.fillStyle = 'gray';
  			lapiz.fillRect(x, y, tam, tam);
  		} else if (visible[f][c] == 2 && estado == 0) {
  			lapiz.fillStyle = 'blue';
  			lapiz.fillRect(x, y, tam, tam);
  		} else if (tablero[f][c] < 9) {
  			lapiz.fillStyle = 'white'; //gris claro
  			lapiz.fillRect(x, y, tam, tam);
  			if (tablero[f][c] > 0 && tablero[f][c] <9) {
  				if (tablero[f][c] == 1) {
  					lapiz.fillStyle = 'blue';
  					//lapiz.setFont(fuenteNum);
  					lapiz.fillText("" + tablero[f][c], x + 13, y + 30);
  				}else if(tablero[f][c] == 2) {
  					lapiz.fillStyle = 'green';
  					//lapiz.setFont(fuenteNum);
  					lapiz.fillText("" + tablero[f][c], x + 13, y + 30);
  				}else if(tablero[f][c] == 3) {
  					lapiz.fillStyle = 'red';
  					//lapiz.setFont(fuenteNum);
  					lapiz.fillText("" + tablero[f][c], x + 13, y + 30);
  				}else if(tablero[f][c] >= 4) {
  					lapiz.fillStyle = 'blue';
  					//lapiz.setFont(fuenteNum);
  					lapiz.fillText("" + tablero[f][c], x + 13, y + 30);
  				}

  			}
  		} else {
  			lapiz.fillStyle = 'red';
  			lapiz.fillRect(x, y, tam, tam);
  			lapiz.fillStyle = 'black';
  			//lapiz.setFont(fuenteBom);
  			lapiz.fillText("" + "*", x + 13, y + 50);
  		}

  		// ------------------------------------
  		// Verificacion bombas puestas
  		/*if (miSistema.getVisible()[f][c] == 0 && miSistema.getTablero()[f][c] == 9) {
  			lapiz.setColor(Color.pink);
  			lapiz.fillRect(x, y, 40, 40);
  		}*/
  		// ------------------------------------

  		//Dibuja los bordes de los recuadros
  		lapiz.fillStyle = 'black';
  		lapiz.rect(x, y, tam, tam);
      lapiz.stroke();
      //canvas.closePath();
  	}
  }
}


//Metodo crea tablero, y pone 99 minas aleatorias
function crearTablero(){
    //Inicializa el tablero
    for (f = 0; f < alt; f++){
        for (c = 0; c < anc; c++){
            tablero[f][c] = 0;
            visible[f][c] = 0;
        }
    }
    estado = 0;
    casillasVistas = 0;

    //Poner 99 minas
    for (mina = 0; mina < 99; mina++){
        //Busca una posicion aleatoria donde no haya mina
        var f;
        var c;
        do{
            f = Math.trunc((Math.random()*(15+1)));
            c = Math.trunc((Math.random()*(29+1)));
            //System.out.println("Coor(" + f + "," + c +")");
        }while(tablero[f][c] == 9);
        //Pone la mina
        tablero[f][c] = 9;
        //Recorre el contorno de la mina e incrementa los contadores
        for (f2 = max(0, f-1); f2 < min(alt,f+2); f2++){
            for (c2 = max(0,c-1); c2 < min(anc,c+2); c2++){
                if (tablero[f2][c2] != 9){ //Si no es bomba
                    tablero[f2][c2]++; //Incrementa el contador
                }
            }
        }
    }

    tableroConsola();
}


//Tablero en consola
function tableroConsola() {

  var text = "";
  //Mostrasr Matriz
  for (f = 0; f < alt; f++){
      for (c = 0; c < anc; c++){
        text = text + " " + tablero[f][c];
      }
      text = text + "\n";
  }
  console.log(text);

}

//Caculo del mayor de dos numeros
function max(a, b){
    return Math.max(a,b);
}

//Caculo del menor de dos numeros
function min(a, b){
    return Math.min(a,b);
}

//Cambio del estado de la partida a Juego Terminado
function gameOver(){
    estado = 1;
}

//Cambio del estado de la partida a Victoria
function victoria(){
    estado = 2;
}
