function aleatorio(piso,techo){
	return Math.floor(Math.random() * (techo - piso + 1)) + piso;
}
//Genera la posicion sobre los carriles
function posAleatoria(carriles){
  var discriminante = aleatorio(0,carriles-1);
	return 100 + ((discriminante*64)-1);
}
//Genera la velocidad en los carros (Impar->Izquierda,Par->derecha)
function direccion(velocidad,posicion){
		if(Math.floor(posicion/64) % 2 ==0)
			return aleatorio(-velocidad,0);
		else
			return aleatorio(0,velocidad);
}
//Asignar imagen al carro
function asignarImagen(asignador,velocidad){
		var imagen = "#auto_"+asignador;
		if(velocidad < 0){ imagen = imagen + "i";}
		else{ imagen = imagen + "d";}
		return imagen;
}

function Carro(x,y){

	//Coloca las condiciones iniciales del carro
	this.setCarro = function(){
		//Coloca el carro en algun carril, que es el parametro
		this.y = posAleatoria(6);

		this.velocidad = 0;

		//Coloca la velocidad segun el parametro lo indique
		while(this.velocidad == 0)
			this.velocidad = direccion(4,this.y);

		var asignadorImagen = aleatorio(0,6)+1;

		this.img = $(asignarImagen(asignadorImagen,this.velocidad))[0];
	}

	//Coloca el carro en un sitio horizontal aleatorio
	this.x = aleatorio(0,620);
	this.setCarro();

	//Coloca nuevas condiciones iniciales para el carro
	this.resetearCarro = function(){

		this.setCarro();

		if(this.velocidad < 0){ this.x = 640;}
		else{this.x = -100;}
	}

	//Dibuja el carro en la carretera
	this.dibujar = function(ctx){
		var img = this.img;
		ctx.drawImage(img,this.x,this.y);
	}

	/*
	Cambia propiedades para dar movimiento al carro y
	resetea las condiciones del carro si llega al limite de la carretera
	*/
	this.actualizar = function(){
		this.x += this.velocidad;
		if(this.x <= -100 || this.x >= 639){
			this.resetearCarro();
		}
	}
	
}
