<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once('/home/libecour/public_html/moodle/config.php');        // 1


// Produce output in JSON format
//$outp = "[";
//$outp .= '{"trail":"' . $_SESSION["trail"] . '"}';
//$outp .= ", ";
//$outp .= '{"wheel":"' . $_SESSION["wheel"] . '"}';
//$outp .= ", ";
//$outp .= '{"speed":"' . $_SESSION["speed"] . '"}';
//$outp .= "]";

$pos = strpos($SESSION->fromdiscussion,"=");
$cc = substr($SESSION->fromdiscussion,$pos+1);


// $outp = '{"trail":"' . $_SESSION["trail"] . '"' . "," . '"wheel":"' . $_SESSION["wheel"] . '"' . "," . '"speed":"' . $_SESSION["speed"] . '"' . "," . '"link":"' . $SESSION->fromdiscussion . '"}';
// $outp = '{"' . substr($SESSION->fromdiscussion,$pos+1) . '":' . '{"trail":"' . $_SESSION["trail"] . '"' . "," . '"wheel":"' . $_SESSION["wheel"] . '"' . "," . '"speed":"' . $_SESSION["speed"] . '"}' . "}";

$outp = '{"trail":"' . $_SESSION["trail"][$cc] . '"' . "," . '"wheel":"' . $_SESSION["wheel"][$cc] . '"' . "," . '"speed":"' . $_SESSION["speed"][$cc] . '"}';


//echo $outp;
// echo "<br /><br /><br />";
// echo count($_SESSION["trail"]);
// echo "<br /><br /><br />";
// print_r(array_keys($_SESSION["trail"]));
// echo "<br /><br /><br />";
 print_r($_SESSION);
//print_object($SESSION[fromdiscussion]);
//print_r($SESSION->fromdiscussion);
// print_r($outp);