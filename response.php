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
  $userAge = calcAge();

  // TEST
 /* switch($location) { //Switch case for value of action
      case "92111": test_function(); break;
    } */
 // END TEST
}

function calcAge() {
  // This needs to be captured once the user logs in - hardcoding for now
  // $userName = $_REQUEST["userName"];
  $userName = 'Christina'; // For testing


  // Query the database
  $userNameQuery = 'SELECT MONTH, YEAR FROM User WHERE Username = ' . $userName;

  // Capture results in a variable to use in loop
  $ageResult = mysql_query($userNameQuery);

  while($row = mysql_fetch_array($ageResult)){
   $m=$row["MONTH"];
   $y=$row["YEAR"];
  }

  $dateString = $y . $m . '01';

  $from = new DateTime($dateString);
  $to   = new DateTime('today');
  $age = $from->diff($to)->y;

  echo $age;
}

//function selectLocationEquipment($location, $goal, $userAge, $desiredWorkout, $fitnessLevel) {

  if($goal) {
    $equipmentQuery = 'SELECT * FROM Location A, Equipment B WHERE A.Zipcode = {$location} AND A.Zipcode = B.Zipcode AND
    B.desried_Area = {$desiredWorkout} AND
    B.MIN_AGE < {$userAge} AND
    B.MAX_AGE > {$userAge}';
  } else if ($desiredWorkout) {
    $equipmentQuery = 'SELECT * FROM Location A, Equipment B WHERE A.Zipcode = {$location} AND A.Zipcode = B.Zipcode AND
    (B.Goal = {$goal} OR 
    B.Goal2 = {$goal} OR
    B.Goal3 = {$goal} OR
    B.Goal4 = {$goal}) AND
    B.MIN_AGE < {$userAge} AND
    B.MAX_AGE > {$userAge}';
  }

  $equipmentResult = mysql_query($equipmentQuery);

  $equipmentData=array();

  if($equipmentResult) {
    while($row = mysql_fetch_array($equipmentResult)){
      $equipmentData[]=$row;
    }
  }

  echo json_encode($equipmentData);

//}

// Query the database
// $query = 'SELECT * FROM ' . $usertable;

// // Capture results in a variable to use in loop
// $result = mysql_query($query);

// // Create array for query results output
// $data=array();
 
// if($result) {

//    Loop throught the results and push into data array, might need to update
//    this to handle the results we are getting from query. This is just for simlple
//    example 
    
//   while($row = mysql_fetch_array($result)){
//    $data[]=$row;
//   }

//   // Parse to JSON format for handling in workout_a.html
//   echo json_encode($data);

// } else {
//   print "Database NOT Found ";
// }


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