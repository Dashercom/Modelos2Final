<?php

    include("Logica.php");


    $resultado = Logica::getIP();

    $datos = array(
        'estado' => "ok",
        'res' => $resultado,
    );

    echo json_encode($datos);

?>