<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


global $DB;
global $USER;

// Require config.php file for database connection								// 1
require_once('/home/libecour/public_html/moodle/config.php');

// Check if the user is logged in and set the context							// 2
//require_login();
//$context = context_system::instance();


// Get parameter from session and save it in a local variable					// 3
//$word = optional_param('word', '', PARAM_STR);
//$word = $_GET['word'];


// Create connection - MySQLi (object-oriented)									// 4
$conn = new mysqli($CFG->dbhost, $CFG->dbuser, $CFG->dbpass, $CFG->dbname);

// Check connection - MySQLi (object-oriented)									// 5
if ($conn->connect_error) {
   die("Connection to the database failed: " . $conn->connect_error . "<br>");
}

// Set character set to UTF8													// 6
mysqli_set_charset($conn,"utf8");


if ($USER->id != 0) {
    
    // Select Statement - MySQLi (object-oriented)									// 7
    $sql = "SELECT * FROM mdl_pe_learner_profile WHERE userid = $USER->id";
    $result = $conn->query($sql);
    $rows = $result->num_rows;

	// free result set															// 8
	$result->free();

    // Insert rows in learner profile table								// 9
    if ($rows == 0) {
	    // insert values into table mdl_pe_learner_profile
	    $sql = "INSERT INTO mdl_pe_learner_profile (userid, cognitivestyleid, completedinductiontest, lastupdatedbylibe) VALUES ($USER->id, 1, DEFAULT, NULL)";
	    $conn->query($sql);
	    //echo "insert successful";
    }
}

// echo $USER->id;

// Close database connection													// 10
$conn->close();