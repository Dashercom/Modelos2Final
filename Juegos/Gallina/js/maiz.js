function aleatorio(piso,techo){
	return Math.floor(Math.random() * (techo - piso + 1)) + piso;
}

function Maiz(){

	//Coloca el maiz en un sitio horizontal aleatorio
	this.x = aleatorio(0,620);
	//Coloca el carro en algun carril, que es el parametro
	this.y = aleatorio(100,473);

	this.comido = false;

	this.img =  $("#maiz")[0];

	//Dibuja el maiz en la carretera
	this.dibujar = function(ctx){
		var img = this.img;
		ctx.drawImage(img,this.x,this.y);
	}

	//Cambia la posicion cuando el maiz sea comido
  this.cambiarPosicion = function(){
		this.x = aleatorio(0,620);
		this.y = aleatorio(100,473);
  }

}
