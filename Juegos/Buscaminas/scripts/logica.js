var alt = 16;
var anc = 30;
estado = 0; //0 jugando, 1 game over, 2 victoria
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
        }else if (boton == 2){
            if (visible[f][c] == 0){
                visible[f][c] = 2;
            }else if (visible[f][c] == 2){
                visible[f][c] = 0;
            }
        }
    }else{
        crearTablero();
        document.getElementById("cara").src = "images/smile.png";
        resetTime();
    }

}

//Metodo que verifica la casilla pulsada y ejecuta procedimientos segun sea adecuado
function clicCasilla(f, c){
    //Si la casilla esta tapada
    if (visible[f][c] == 0){
        //Descubre la casilla
        visible[f][c] = 1;
        casillasVistas++;
        puntaje();
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
    document.getElementById("cara").src = "images/smileB.png";
}

//Cambio del estado de la partida a Victoria
function victoria(){
    estado = 2;
    document.getElementById("cara").src = "images/smileH.png";
}

function puntaje(){
    document.getElementById('puntaje').innerHTML = casillasVistas;
}

function resetTime(){
  totalTime=0;
  updateClock();
  casillasVistas=0;
  document.getElementById('puntaje').innerHTML = casillasVistas;
}
