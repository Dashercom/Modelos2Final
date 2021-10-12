<?php
    class BaseDatos extends SQLite3{

    function __construct(){
        $this->open("../jugadores.db");
    }
    }

    class Logica{

        static function  getIP() {

            if (isset($_SERVER["HTTP_CLIENT_IP"]))
            {
                return $_SERVER["HTTP_CLIENT_IP"];
            }
            elseif (isset($_SERVER["HTTP_X_FORWARDED_FOR"]))
            {
                return $_SERVER["HTTP_X_FORWARDED_FOR"];
            }
            elseif (isset($_SERVER["HTTP_X_FORWARDED"]))
            {
                return $_SERVER["HTTP_X_FORWARDED"];
            }
            elseif (isset($_SERVER["HTTP_FORWARDED_FOR"]))
            {
                return $_SERVER["HTTP_FORWARDED_FOR"];
            }
            elseif (isset($_SERVER["HTTP_FORWARDED"]))
            {
                return $_SERVER["HTTP_FORWARDED"];
            }
            else
            {
                return $_SERVER["REMOTE_ADDR"];
            }
        }

        static function juegosFav($ip){
            $db = new BaseDatos();
    
            if(!$db){
                echo $db->lastErrorMsg();
            }else{
            }
    
            $sql =<<<EOF
                SELECT Juego FROM Puntaje WHERE Jugador = $ip ORDER BY score DESC;
    EOF;
    
            $ret =$db->query($sql);
            $contador = 0;
            $top = array(0,0);
            $c = 0;
            while($row = $ret->fetchArray(SQLITE3_ASSOC)){
                $contador = $contador + 1;
                if($contador <= 2){
                    $top[$c] = $row['Juego'];
                    $c++;
                }
            }
            $db->close();
            return $top;
        }

        static function insertarJugador($ip,$nombre){
            $db = new BaseDatos();
    
            if(!$db){
                echo $db->lastErrorMsg();
            }else{
            }
        $sql =<<<EOF
            INSERT INTO  Jugador (Ip,Nombre)  VALUES ($ip,$nombre);
            INSERT INTO  Puntaje (Juego,score,Jugador)  VALUES (1,0,$ip);
            INSERT INTO  Puntaje (Juego,score,Jugador)  VALUES (2,0,$ip);
            INSERT INTO  Puntaje (Juego,score,Jugador)  VALUES (3,0,$ip);
            INSERT INTO  Puntaje (Juego,score,Jugador)  VALUES (4,0,$ip);
            INSERT INTO  Puntaje (Juego,score,Jugador) VALUES (5,0,$ip);
         EOF;
        $ret = $db->exec($sql);
            return "ok";
        }

        static function buscarJugador($ip){
            $db = new BaseDatos();
    
            if(!$db){
                echo $db->lastErrorMsg();
            }else{
            }
    
            $sql =<<<EOF
                SELECT * FROM Jugador WHERE Jugador.Ip = $ip;
    EOF;
    
            $ret =$db->query($sql);
            $contador = 0;
            $nombre = " ";
            while($row = $ret->fetchArray(SQLITE3_ASSOC)){
                $contador = $contador + 1;
                if($contador != 0){
                    $nombre = $row['Nombre'];
                }
            }
            $db->close();
            return $nombre;
        }

        static function aumentarScore($ip,$juego){
            $db = new BaseDatos();
    
            if(!$db){
                echo $db->lastErrorMsg();
            }else{
            }
    
            $sql =<<<EOF
            UPDATE Puntaje  SET score = score + 1 WHERE Jugador = $ip AND Juego = $juego;
         EOF;
        $ret = $db->exec($sql);
            return "ok";
        }
    
        }
    

?>