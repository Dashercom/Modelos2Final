function Gallina(){
	this.x = 310;
	this.y = 15;
	this.img = [$("#abajo")[0],$("#izquierda")[0],$("#derecha")[0],$("#arriba")[0],$("#muerto")[0]];
	this.sprite = 0;
	this.vida = true;
	this.puntos = 0;

	/*
		Cada que se mueve, los sprites cambian:
		- Cambio de posicion, si cambia de direccion (izq. o der.),
		  respetando los limites del juego
		- El personaje tambien cambia visualmente de direccion.
	*/
	this.actualizar = function(accion){
		if(accion=="arriba" && this.y > 15){
			this.y -= 10;
			this.sprite = 3;
		}
		if(accion=="abajo"  && this.y < 500){
			this.y += 10;
			this.sprite = 0;
		}
		if(accion=="izquierda"){
			this.x -= 10;
			this.sprite = 1;
		}
		if(accion=="derecha"){
			this.x += 10;
			this.sprite = 2;
		}
		this.x = (640 + this.x)%640;
		this.y = (540 + this.y)%540;

	}

	//Dibuja a la gallina con sus respectivas caracteristicas
	this.dibujar = function(ctx){
		var img = this.img[this.sprite];
		var x = this.x;
		var y = this.y;

		ctx.drawImage(img, x, y);
		ctx.save();
		ctx.fillStyle = "#ffffff";
		ctx.font = "12px sans-serif";
		ctx.fillText("puntos: "+ this.puntos, x, y + 75);
		ctx.restore();
	}

  //Funcion para validar si colisiona con algun objeto de la partida
	this.colision = function(x,y){
		var distancia=Math.sqrt( Math.pow( (x-this.x), 2)+Math.pow( (y-this.y),2));
		if(distancia>this.img[this.sprite].width)
		   return false;
		else
		   return true;
	}
}
