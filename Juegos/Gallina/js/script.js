
var jugando;
$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
	jugando = true;
	miCanvas = $("#mi_canvas")[0];
	contexto = miCanvas.getContext("2d");
	buffer = document.createElement("canvas");
	//Invocando la Gallina
	gallina = new Gallina();
	//Invocando el maiz
	maiz = new Maiz();
	//Invocando los carros
	carros = [new Carro() , new Carro(),
						new Carro(), new Carro(),
						new Carro(), new Carro(),
						new Carro(), new Carro(),
						new Carro(), new Carro()];

	run();

	//Se abren las instrucciones
	$('#instrucciones').click(function(){
        $('#popup').fadeIn('slow');
        $('.popup-overlay').fadeIn('slow');
        $('.popup-overlay').height($(window).height());
        return false;
    });

		//Se cierran las instrucciones
    $('#close').click(function(){
        $('#popup').fadeOut('slow');
        $('.popup-overlay').fadeOut('slow');
        return false;
    });

		//Reiniciar el Juego (Solo funciona cuando no ha empezado o ya se ha muerto)
    $("#iniciar").click(function(){
		jugando = false;
		if(jugando==false){
			inicio();
			$('#nuevaVida')[0].play();
		}

	});
}
/*
  Capturador de Teclas para dar los eventos de movimiento:
  Lanza el evento al personaje y el se encarga de realizar tanto movimiento
  Como cambios visuales (Cambiar la direccion a donde observa)
*/
function capturaTeclado(event){
	if(event.which==38 || event.which==87)
		gallina.actualizar('arriba');
	if(event.which==40 || event.which==83)
		gallina.actualizar('abajo');
	if(event.which==39 || event.which==68)
		gallina.actualizar('derecha');
	if(event.which==37 || event.which==65)
		gallina.actualizar('izquierda');

}

function run(){
	//Configurando el expacio de juego
	buffer.width = miCanvas.width;
	buffer.height = miCanvas.height;
	contextoBuffer = buffer.getContext("2d");

	if(jugando){
		//Estado durante Juego

			contextoBuffer.clearRect(0,0,buffer.width,buffer.height);

			if(maiz.comido){
					maiz.cambiarPosicion();
					maiz.comido = false;
			}

			maiz.dibujar(contextoBuffer);
			gallina.dibujar(contextoBuffer);

			for(i=0;i<carros.length;i++){
				carros[i].dibujar(contextoBuffer);
				carros[i].actualizar();
				//Colision de Gallina y Autos
				if(gallina.colision(carros[i].x,carros[i].y)){
					gallina.vida = false;
					//Sonido de choque
					$('#pierde')[0].play();
				}
			}

		//Colision de gallina y maiz
		if(gallina.colision(maiz.x,maiz.y)){
			gallina.puntos++;
			//Sonido de comida
			$('#come')[0].play();
			maiz.comido = true;
		}
		if(!gallina.vida){
			jugando = false;
		}

			contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
			contexto.drawImage(buffer, 0, 0);
			setTimeout("run()",20);

	}
	//Estado Juego Acabado
	else{
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		contextoBuffer.fillStyle = "#ffffff";
		//Muerte Sprite
		gallina.sprite = 4;
		gallina.vida = false;
		gallina.dibujar(contextoBuffer);
		contextoBuffer.font = "50px sans-serif";
		contextoBuffer.fillText("GAME OVER", 300, 440);
		contextoBuffer.fillStyle = "#ff0000";
		contextoBuffer.font = "15px sans-serif";
		//contextoBuffer.fillText("try again", 550, 460);
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
	}



}
