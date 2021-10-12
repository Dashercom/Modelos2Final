<?php

    include("Logica.php");

    $ipe = $_POST['ip'];
    $nombre = $_POST['nombre'];

    $resultado = Logica::insertarJugador($ipe,$nombre);


    $datos = array(
        'estado' => $resultado,
    );

    echo json_encode($datos);

?>