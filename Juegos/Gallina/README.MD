#### Gabriel Esteban Castillo Ramirez
#### Omar Alejandro Espitia Sanchez
#### Juan Camilo Martinez Lopez
# Juego de la Gallina :chicken:
### Introducción
La gallina se ha perdido en la carretera y su alimento se ha esparcido en ella, esta hambrienta
y necesita de su maiz para saciar su necesidad de alimento.


### Instrucciones del juego
* La gallina es controlada por las flechas del teclado o con las teclas W A S D, el objetivo del juego
es recolectar maiz para obtener puntos, cada maiz otorga un punto.
* Los obstaculos son los autos, los cuales pueden ir muy velozmente o muy lentamente, ambos colocando 
al jugador en distintos retos a su destreza, tocar un auto significar  la muerte de la gallina y por 
ende la terminación de la partida.


<img src="https://user-images.githubusercontent.com/43209755/60149719-4b444080-979b-11e9-981c-fa76689d7db6.png" width="560">

### Estructura del juego
El juego se apoya en lenguajes como HTML y JavaScript, además de hacer uso de CSS, no se ahondará en el uso del CSS.

#### Esqueleto principal
La estructura principal del juego se encuentra en el archivo "script.js" en donde veremos lo siguiente:
1. El juego se apoya en dos estados, cuando la gallina vive y cuando muere.
2. Las condiciones para inicializar el juego se encuentran en el archivo.
3. Los eventos de interacción con la p gina se dan igualmente dentro del archivo (intrucciones, reinicio de juego y captura de teclas).

#### Visualización e interacción 
El £nico archivo "index.html" con ayuda de "default.css" nos ayuda a dar la base visual del juego, en ella encontramos:
1. La estructura visual de la pagina en donde el juego se despliega.
2. Información de creadores, palabras clave y descripción breve del juego.
3. Referencias visuales y auditivas del juego (las fuentes de las referencias se encuentran en el pdf adjunto en el repositorio).

#### Funcionalidad
Los archivos de cada elemento visible en el juego se encuentran clasificados en "gallina.js","maiz.js" y "carro.js".
Cada uno de los scripts define la base de tanto sus cambios visuales, su l¢gica interna y la experiencia de juego.
Empezando por la gallina, ella cuenta con los siguientes atributos:
* Posición en "x" y "y".
* Imagenes (sprites).
* Estado vivo/muerto.
* Puntaje.


Además cuenta con los siguientes comportamientos:
* Actualizar su posición conforme se presionan teclas de movimiento.
* Dibujarse en el tablero junto a sus caracter¡sticas (puntaje).
* Verificar colisiones ya sea con autos o con ma¡z.

Continuando con el maíz, ella contiene funciones y atributos más sencillos, sus atributos son:
* Posición en "x" y "y".
* Estado comido/no comido.
* Imagen.


Siendo complementado por sus funciones:
* Dibujarse en el tablero.
* Cambiar de posición cada que sea comido por la gallina.
Apoyandose de una función sencilla de generaci¢n de números aleatorios. 


Finalmente los autos, los cuales cuentan con distintos comportamientos y varriables complementarias, continuando con el orden, estos atributos son:
* Posición en "x" y "y".
* Velocidad.
* Imagen.

Asimismo, veremos que cuenta con sus respectivas funciones:
* Inicializar las características del carro.
* Reinicar las características del carro.
* Dibujarse en el tablero.
* Actualizar su posici¢n dependiendo de su velocidad.
Se apoya en funciones como generar números aleatorios, posición aleatoria dada una cantidad de carriles,
asigna la velocidad dependiendo del carril en donde esta y de igual manera la imagen asociada a su velocidad. 
 
Finalmente veremos en ejecución cada subestructura accionando el .html que se encuentra en el repositorio.


