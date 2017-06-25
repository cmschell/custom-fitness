<?php
 // header("Access-Control-Allow-Origin: *"); We might need this when we upload to server

//Connect To Database
$hostname = "174.136.46.205";
$username = "magneti_wpuser";
$password = "MuseDB!";
$dbname = "magneti_customfitness";

// Set variables for select query
$usertable='Location';
$yourfield = 'Zipcode';

// Connection string
mysql_connect($hostname,$username, $password) OR DIE ('Unable to connect to database! Please try again later.');
mysql_select_db($dbname);

if (isset($_REQUEST["location"]) && !empty($_REQUEST["location"])) { //Checks if location value exists

  // Collect variables from cookies set on preferences_a.html
  $location = $_REQUEST["location"];
  $fitnessLevel = $_REQUEST["fitnessLevel"];
  $goal = $_REQUEST["goal"];
  $desiredWorkout = $_REQUEST["desiredWorkout"];

  // TEST
 /* switch($location) { //Switch case for value of action
      case "92111": test_function(); break;
    } */
 // END TEST
}


// Query the database
$query = 'SELECT * FROM ' . $usertable;

// Capture results in a variable to use in loop
$result = mysql_query($query);

// Create array for query results output
$data=array();
 
if($result) {

  /* Loop throught the results and push into data array, might need to update
   this to handle the results we are getting from query. This is just for simlple
   example 
  */  
  while($row = mysql_fetch_array($result)){
   $data[]=$row;
  }

  // Parse to JSON format for handling in workout_a.html
  echo json_encode($data);

} else {
  print "Database NOT Found ";
}


// THIS IS A TEST FUNCTION TO RETURN RESULTS IN JSON FORMAT - use this in the switch statement to test
function test_function(){
  $return = $_REQUEST;

  //Do what you need to do with the info. The following are some examples.
  if ($return["location"] == "92111"){
   $return["location"] = "Balboa";
  }
  $return["fitnessLevel"] = "Updated value of fitness level";
  $return["goal"] = "Actual goal";


  $return["json"] = json_encode($return);
  echo json_encode($return);
}
/// END TEST 

// Not sure if we need the below line
//$conn->close(); 

?>