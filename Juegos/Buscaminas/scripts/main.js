
var canvas = document.getElementById('canvas');
var lapiz = canvas.getContext('2d');

//lapiz.fillStyle = 'green';
//lapiz.fillRect(0, 0, canvas.getAttribute('width'), canvas.getAttribute('height'));

//Inicializa el tablero
for (f = 0; f < 16; f++){
    for (c = 0; c < 30; c++){
        tablero[f][c] = 0;
        visible[f][c] = 0;
    }
}

//-----------------------------------
crearTablero();
pintar();
setInterval("pintar()",700);

//window.setTimeout(Dibujar, 700);

/*function Dibujar ( i ){
  while ( true ) {
    pintar();
  }
}*/

function pintar(){

  var imgMina = new Image();
  imgMina.src = "Juegos/Buscaminas/images/mina.png";

  var imgBandera = new Image();
  imgBandera.src = "Juegos/Buscaminas/images/bandera.png";

  var grisCla = 'rgb(195, 195, 195)';
  var verdeOsc = 'rgb(23, 140, 21)';
  var azulOsc = 'rgb(11, 13, 130)';
  var tam = 30;
  // Pinta las casillas
  for (f = 0; f < alt; f++) {
  	for (c = 0; c < anc; c++) {
  		var x = c * tam;
  		var y = f * tam;
      lapiz.beginPath();
  		if (visible[f][c] == 0 && estado == 0) {
  			lapiz.fillStyle = 'gray';
  			lapiz.fillRect(x, y, tam, tam);
  		} else if (visible[f][c] == 2 && estado == 0) {
  			lapiz.fillStyle = 'gray'; //Fondo casilla con bandera
  			lapiz.fillRect(x, y, tam, tam);
        lapiz.drawImage(imgBandera, x, y);
  		} else if (tablero[f][c] < 9) {
  			lapiz.fillStyle = grisCla; //gris claro
  			lapiz.fillRect(x, y, tam, tam);
  			if (tablero[f][c] > 0 && tablero[f][c] <9) {
  				if (tablero[f][c] == 1) {
  					lapiz.font = "15pt Impact";
            lapiz.fillStyle = 'blue';
  					//lapiz.setFont(fuenteNum);
  					lapiz.fillText("" + tablero[f][c], x + 11, y + 25);
  				}else if(tablero[f][c] == 2) {
  					lapiz.fillStyle = verdeOsc;
            lapiz.font = "15pt Impact";
  					//lapiz.setFont(fuenteNum);
  					lapiz.fillText("" + tablero[f][c], x + 11, y + 25);
  				}else if(tablero[f][c] == 3) {
  					lapiz.fillStyle = 'red';
            lapiz.font = "15pt Impact";
  					//lapiz.setFont(fuenteNum);
  					lapiz.fillText("" + tablero[f][c], x + 11, y + 25);
  				}else if(tablero[f][c] >= 4) {
            lapiz.font = "15pt Impact";
  					lapiz.fillStyle = azulOsc;
  					//lapiz.setFont(fuenteNum);
  					lapiz.fillText("" + tablero[f][c], x + 11, y + 25);
  				}

  			}
  		} else {
  			lapiz.fillStyle = 'gray'; // Fondo para las casillas de las minas
  			lapiz.fillRect(x, y, tam, tam);
  			lapiz.fillStyle = 'black';
        lapiz.drawImage(imgMina, x, y);
  			//lapiz.setFont(fuenteBom);
  			//lapiz.fillText("" + "*", x + 13, y + 20);
  		}
/*
      if (visible[f][c] == 0 && tablero[f][c] == 9) {
        lapiz.fillStyle(Color.pink);
        //lapiz.fillRect(x, y, 40, 40);
      }
*/
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
      lapiz.closePath();
  	}
  }
}
