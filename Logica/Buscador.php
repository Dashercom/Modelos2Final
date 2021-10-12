<?php

    include("Logica.php");

    $ipe = $_POST['ip'];
    $resultado = Logica::buscarJugador($ipe);

    $datos = array(
        'estado' => "ok",
        'nombre' => $resultado,
    );

    echo json_encode($datos);

?>