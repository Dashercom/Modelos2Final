canvas.addEventListener('click', coord);
canvas.addEventListener('dblclick', band);
document.addEventListener('contextmenu', function(e) {
  coord(e);
  e.preventDefault();

},);

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

function band(event){
  var x = new Number();
  var y = new Number();
  var boton = 1;

  var rect = canvas.getBoundingClientRect();

  if (event.x != undefined && event.y != undefined){

    x = event.x - rect.left;
    y = event.y - rect.top;
    //boton = event.button;
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
