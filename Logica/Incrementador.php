<?php

    include("Logica.php");

    $ipe = $_POST['ip'];
    $juego = $_POST['juego'];

    $resultado = Logica::aumentarScore($ipe,$juego);


    $datos = array(
        'estado' => $resultado,
    );

    echo json_encode($datos);

?>