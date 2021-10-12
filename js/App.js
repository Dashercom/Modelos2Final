var myIp,fav1,fav2;

$(document).ready(inicio);



function inicio(){
    buscarIp();
}


//Probar
function buscarIp(){
    var datos = new FormData();
    datos.append("ip",JSON.stringify("Basura"));

    enviarInfo(datos,'Logica/Ip.php')
    .then(res => {
            console.log(res);
            if(res.estado == "ok"){
                myIp= res.res;
                buscar(res.res);
            }else{
                window.alert("Se ha producido un error")
            }
        }

    )
}



function registrar(ip,nombre){
    var datos = new FormData();
    datos.append("ip",JSON.stringify(ip));
    datos.append("nombre",JSON.stringify(nombre));

    enviarInfo(datos,'Logica/Negociador.php')
    .then(res => {
        console.log(res);
            if(res.estado == "ok"){
                window.alert("Te has registrado correctamente");
                location.reload();
            }else{
                window.alert("Se ha producido un error")
                location.reload();
            }
        }

    )
}

function buscar(ip){
    var datos =  new FormData();
    datos.append("ip",JSON.stringify(ip));

    enviarInfo(datos,'Logica/Buscador.php')
    .then(res => {
        console.log(res);
            if(res.estado == "ok"){
                if(res.nombre == " "){
                    var usuario = prompt("Bievenido ingresa un nombre de usuario por favor", "Nombre de usaurio");
                    if (usuario == null || usuario == "") {
                        window.alert("Ingrese un usuario valido");
                    } else {
                        registrar(myIp,usuario);
                    }
                }else{
                    document.getElementById("username").innerHTML = "Bienvenido " +  res.nombre;
                    topJuegos(myIp);
                }
            }else{
                console.log("no se ha encontrado el usuario")
                return res.nombre;
            }
        }

    )
}

function aumentar(juego){

    if(juego == 6){
        juego = fav1;
    }
    if(juego == 7){
        juego = fav2;
    }
    var datos =  new FormData();
    datos.append("ip",JSON.stringify(myIp));
    datos.append("juego",JSON.stringify(juego));

    enviarInfo(datos,'Logica/Incrementador.php')
    .then(res => {
        console.log(res);
            if(res.estado == "ok"){
                console.log("he aumentado el score correctamente")
            }else{
                console.log("Fail D:")
            }
        }

    )
}

function topJuegos(ip){
    var datos = new FormData();
    datos.append("ip",JSON.stringify(ip));

    enviarInfo(datos,'Logica/Top.php')
    .then(res => {
        console.log(res);
            if(res.estado == "ok"){
                fav1 = res.res1;
                fav2 = res.res2;
                if(res.res1 == 1){
                    document.getElementById("linkP1").href ="gallina.html";
                    document.getElementById("imgP1").src = "img/crossy.jpg";
                }
                if(res.res1 == 2){
                    document.getElementById("linkP1").href ="llorona.html";
                    document.getElementById("imgP1").src = "img/llorona1.jpg";
                }
                if(res.res1 == 3){
                    document.getElementById("linkP1").href ="parejas.html";
                    document.getElementById("imgP1").src = "img/magical.jpg";
                }
                if(res.res1 == 4){
                    document.getElementById("linkP1").href ="buscaminas.html";
                    document.getElementById("imgP1").src = "img/buscaminas.jpg";
                }
                if(res.res1 == 5){
                    document.getElementById("linkP1").href ="bloques.html";
                    document.getElementById("imgP1").src = "img/block.jpg";
                }

                if(res.res2 == 1){
                    document.getElementById("linkP2").href ="gallina.html";
                    document.getElementById("imgP2").src = "img/crossy.jpg";
                }
                if(res.res2 == 2){
                    document.getElementById("linkP2").href ="llorona.html";
                    document.getElementById("imgP2").src = "img/llorona1.jpg";
                }
                if(res.res2 == 3){
                    document.getElementById("linkP2").href ="parejas.html";
                    document.getElementById("imgP2").src = "img/magical.jpg";
                }
                if(res.res2 == 4){
                    document.getElementById("linkP2").href ="buscaminas.html";
                    document.getElementById("imgP2").src = "img/buscaminas.jpg";
                }
                if(res.res2 == 5){
                    document.getElementById("linkP2").href ="bloques.html";
                    document.getElementById("imgP2").src = "img/block.jpg";
                }
                
            }else{
                console.log("Fail D:")
            }
        }

    )
}


function cambiarVentana(link,juego){
    aumentar(juego);

    window.location.replace(link);
}

async function enviarInfo(datosEnviados,archivo){
    respuesta = await fetch(archivo,{
        method: 'POST',
        body: datosEnviados,
        mode: "cors"
    });
    recibe = await respuesta.json(); // sé que recibo un json
    return recibe;
}

