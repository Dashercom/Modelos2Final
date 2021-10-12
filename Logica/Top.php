<?php

    include("Logica.php");

    $ipe = $_POST['ip'];

    $resultado = Logica::juegosFav($ipe);


    $datos = array(
        'estado' => "ok",
        'res1' => $resultado[0],
        'res2' => $resultado[1],
    );

    echo json_encode($datos);

?>