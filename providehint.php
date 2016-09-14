<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

global $DB;
global $USER;

// Require config.php file for database connection								// 1
require_once('/var/www/html/moodle/config.php');

// Get quiz number																// 2
$quiz = $_GET['quiz'];

// Get question number															// 3
$libequestionid = $_GET['question'];

// Create connection - MySQLi (object-oriented)									// 4
$conn = new mysqli($CFG->dbhost, $CFG->dbuser, $CFG->dbpass, $CFG->dbname);

// Check connection - MySQLi (object-oriented)									// 5
if ($conn->connect_error) {
   die("Connection to the database failed: " . $conn->connect_error . "<br>");
}

// Set character set to UTF8													// 6
mysqli_set_charset($conn,"utf8");

// Check if user is connected													// 7
if ($USER->id != 0) {

	// Select Statement - MySQLi (object-oriented)								// 8
    $sql = "SELECT id FROM mdl_pe_learner_profile WHERE userid = $USER->id" ;
    $result = $conn->query($sql);
	
	// Get learner profile id													// 9
	if ($result->num_rows > 0) {
		$row = $result->fetch_assoc();
		$learnerprofileid = $row['id'];
	}
	
	// free result set															// 10
    $result->free();
    
    // Select Statement - MySQLi (object-oriented)								// 11
    $sql = "SELECT abilitylevel FROM mdl_pe_user_ability_levels ".
    	   "WHERE learnerprofileid = $learnerprofileid AND libethemeid = 2" ;
    $result = $conn->query($sql);
    
   	// Get ability level
   	if ($result->num_rows > 0) {
    	$row = $result->fetch_assoc();
		$abilitylevel = $row['abilitylevel'];
	}

	// free result set															// 12
	$result->free();

    // Select Statement - MySQLi (object-oriented)								// 13
    $sql = "SELECT * FROM mdl_pe_provided_hints_log ".
    	   "WHERE learnerprofileid = $learnerprofileid ".
    	   "AND abilitylevel = '$abilitylevel' ".
    	   "AND libequestionid = $libequestionid" ;
    $result = $conn->query($sql);
    
   	// Calculate attempt
   	$attempt = $result->num_rows + 1;
   	if ($attempt > 2) {
    	$attempt = 2;
	}

	// free result set															// 14
	$result->free();
	
	// Select Statement - MySQLi (object-oriented)								// 15
	$sql = "SELECT id, content FROM mdl_pe_hints ".
		   "WHERE libequestionid = $libequestionid ".
		   "AND attempt = $attempt ".
		   "AND abilitylevel = '$abilitylevel'" ;
    $result = $conn->query($sql);
    
   	// Get content																// 16
   	if ($result->num_rows > 0) {
    	$row = $result->fetch_assoc();
		$hintid = $row['id'];
		$hint = $row['content'];
		
		// free result set														// 17
		$result->free();
		
		// provide hint															// 18
        $outp .= '{"hint":"' . $hint . '"}';
		
    	// Insert row in mdl_pe_provided_hints_log table						// 19
		$sql = "INSERT INTO mdl_pe_provided_hints_log ".
		"(learnerprofileid, abilitylevel, quiz, attempt, ".
		"hintid, libequestionid, consumptiontime) ".
		"VALUES ($learnerprofileid, '$abilitylevel', $quiz, $attempt, ".
		"$hintid, $libequestionid, NULL)";
		$conn->query($sql);
	} else {
	
		// free result set														// 20
		$result->free();
		
		// output no hint found in mdl_pe_hints table							// 21
        $outp = '{"hint":"No hint available"}';
         
        // Insert empty hint in mdl_pe_provided_hints_log table					// 22
		$sql = "INSERT INTO mdl_pe_provided_hints_log ".
		"(learnerprofileid, abilitylevel, quiz, attempt, ".
		"hintid, libequestionid, consumptiontime) ".
		"VALUES ($learnerprofileid, '$abilitylevel', $quiz, $attempt, ".
		"0, $libequestionid, NULL)";
		$conn->query($sql);
	}
}

// Close database connection													// 23
$conn->close();

// output																		// 24
echo $outp;
