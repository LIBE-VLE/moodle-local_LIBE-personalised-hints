<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once('/home/libecour/public_html/moodle/config.php');        // 1

$pos = strpos($SESSION->fromdiscussion,"=");
$cc = substr($SESSION->fromdiscussion,$pos+1);

// Set trail variable
if ($_GET['trail'] != "") {
    $_SESSION["trail"][$cc] = $_GET['trail'];
} elseif (empty($_SESSION["trail"])) {
        $_SESSION["trail"] = array($cc=>"");
}

// Set wheel variable
if ($_GET['wheel'] != "") {
    $_SESSION["wheel"][$cc] = $_GET['wheel'];
} elseif (empty($_SESSION["wheel"])) {
    $_SESSION["wheel"] = array($cc=>"");
}

// Set speed variable
if ($_GET['speed'] != "") {
    $_SESSION["speed"][$cc] = $_GET['speed'];
} elseif (empty($_SESSION["speed"])) {
    $_SESSION["speed"] = array($cc=>"");
}