<?php
 header("Access-Control-Allow-Origin: *"); //We might need this when we upload to server

//Connect To Database
$hostname = "174.136.46.205";
$username = "magneti_wpuser";
$password = "MuseDB!";
$dbname = "magneti_customfitness";

// Connection string
mysql_connect($hostname,$username, $password) OR DIE ('Unable to connect to database! Please try again later.');
mysql_select_db($dbname);

if (isset($_REQUEST["location"]) && !empty($_REQUEST["location"])) { //Checks if location value exists

  // Collect variables from cookies set on preferences_a.html
  $location = $_REQUEST["location"];
  $fitnessLevel = $_REQUEST["fitnessLevel"];
  $goal = $_REQUEST["goal"];
  $desiredWorkout = $_REQUEST["desiredWorkout"];
  $userAge = $_REQUEST["userAge"];

}



  if($goal == "no goal") {
    $equipmentQuery = "SELECT exercise_name, desired_workout, exercise_image, goal1, goal2, goal3 FROM Location A, Equipment B WHERE A.zipcode = '$location' AND (A.zipcode = B.zipcode OR A.zipcode = B.zipcode2 OR A.zipcode = B.zipcode3) AND
    B.desired_workout = '$desiredWorkout' AND
    B.equipment_min_age < '$userAge' AND
    B.equipment_max_age > '$userAge'";
   } else if ($goal != "no goal") {
    $equipmentQuery = "SELECT exercise_name, desired_workout, exercise_image, goal1, goal2, goal3 FROM Location A, Equipment B WHERE A.zipcode = '$location' AND (A.zipcode = B.zipcode OR A.zipcode = B.zipcode2 OR A.zipcode = B.zipcode3) AND
      (B.goal1 = '$goal' OR 
      B.goal2 = '$goal' OR
      B.goal3 = '$goal') AND
      B.Equipment_MIN_AGE < '$userAge' AND
      B.equipment_max_age > '$userAge'";
  }

  $equipmentResult = mysql_query($equipmentQuery);

  $equipmentData=array();

  if($equipmentResult) {
    while($row = mysql_fetch_array($equipmentResult)){
      $equipmentData[]=$row;
    }
  }

  echo json_encode($equipmentData);


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

?>