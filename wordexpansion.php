<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


global $DB;
global $USER;

require_once('/home/libecour/public_html/moodle/config.php');        // 1

//require_login();                                              // 2
//$context = context_system::instance();

//$word = optional_param('word', '', PARAM_STR);
$word = $_GET['word'];


// Create connection - MySQLi (object-oriented)
$conn = new mysqli($CFG->dbhost, $CFG->dbuser, $CFG->dbpass, $CFG->dbname);

// Check connection - MySQLi (object-oriented)
if ($conn->connect_error) {
   die("Connection to the database failed: " . $conn->connect_error . "<br>");
}
// echo "Connected to the database successfully <br>";


// Set character set to UTF8
mysqli_set_charset($conn,"utf8");
// $charset=mysqli_character_set_name($conn);
// echo "Default character set is: " . $charset;


// Select Statement - MySQLi (object-oriented)
// $sql = "SELECT id, firstname, lastname FROM mdl_user";
// $sql = "SELECT lastname FROM mdl_user WHERE id = $USER->id + 1";
// $sql = "SELECT fullname FROM mdl_course WHERE id = (SELECT id FROM mdl_user WHERE lastname = '$USER->lastname') + $word";
//$sql = "SELECT fullname FROM mdl_course WHERE id = $word";
// $sql = "SELECT description FROM glossary WHERE word = 'givenword' AND expansionlevel = '(SELECT abilitylevel FROM user_ability_levels WHERE libethemeid = (SELECT id FROM libe_themes WHERE libetheme = 'literacy') AND learnerprofileid = (SELECT id FROM learner_profile WHERE userid = $USER->id))';
$sql = "SELECT description FROM mdl_pe_glossary WHERE word = '$word' AND expansionlevel = (SELECT abilitylevel FROM mdl_pe_user_ability_levels WHERE libethemeid = (SELECT id FROM mdl_pe_libe_themes WHERE libetheme = 'literacy') AND learnerprofileid = (SELECT id FROM mdl_pe_learner_profile WHERE userid = $USER->id))";
// $sql = "SELECT description FROM mdl_pe_glossary WHERE word = '$word' AND expansionlevel = '(SELECT abilitylevel FROM mdl_pe_user_ability_levels WHERE libethemeid = (SELECT id FROM mdl_pe_libe_themes WHERE libetheme = 'literacy') AND learnerprofileid = (SELECT id FROM mdl_pe_learner_profile WHERE userid = $USER->id))';
//$new = low;
//$sql = "SELECT description FROM mdl_pe_glossary WHERE word = '$word' AND expansionlevel = 'low'";


$result = $conn->query($sql);

/*
if ($result->num_rows > 0) {
   // output data of each row
   while($row = $result->fetch_assoc()) {
      // echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " Lastname: " . $row["lastname"]. "<br>";
      echo "Course description: " . $row["fullname"] . "<br>";
  }
} else {
     echo "0 results <br>";
}
*/


if ($result->num_rows > 0) {
   // output data of each row
   // while($row = $result->fetch_assoc()) {
   while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
      // $outp = "[";
      // $outp .= '{"wordexpansion":"' . $rs["fullname"] . '"}';
      $outp .= '{"wordexpansion":"' . $rs["description"] . '"}';
      // $outp .= "]";
      // $outp = "[" . $row["description"] . "]";
  }
} else {
     // $outp = "[";
     // $outp .= '{"0 results <br>"}';
     $outp .= '{"wordexpansion":"' . $word . '"}';
     // $outp .= "]";
}



/*
$outp = "[";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "[") {$outp .= ",";}
    $outp .= '{"Name":"'  . $rs["firstname"] . '",';
    $outp .= '"Lastname":"'   . $rs["lastname"]        . '",';
    $outp .= '"id":"'. $rs["id"]     . '"}';
}
$outp .="]";
*/

// free result set
$result->free();

// close connection
$conn->close();

// output
echo $outp;
// echo $USER->id;
// printf(%s, $outp);



// close database connection - MySQLi (object-oriented)
//$conn->close();


/*
// Create connection - MySQLi (procedural)
$conn = mysqli_connect($CFG->dbhost, $CFG->dbuser, $CFG->dbpass, $CFG->dbname);

// Check connection - MySQLi (procedural)
if (!$conn) {
   //if (mysqli_connect_errno()) {
   die("Connection to the database failed: " . mysqli_connect_error() . "<br>");
}
echo "Connected to the database successfully" . "<br>";

// Select Statement - MySQLi (procedural)
$sql = "SELECT id, firstname, lastname FROM mdl_user";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
    }
} else {
    echo "0 results <br>";
}

// close database connection - MySQLi (procedural)
mysqli_close($conn);
// $conn = null;
*/



/*
if(is_object($conn) && get_class($conn) == 'mysqli') {
   echo "connection still open <br>";
}

if (!$conn) {
   echo "db connection successfully closed <br>";
}
else {
   echo "db connection is still open <br>";
}
*/

// echo $USER->id . "<br>";
// echo $USER->firstname . "<br>"; 
// echo $USER->lastname . "<br>";
// echo $USER->username . "<br>";
