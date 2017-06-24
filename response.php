<?php

/// TEST - We can use something like this to return data
$servername = "174.136.46.205";
$username = "magneti_wpuser";
$password = "MuseDB!";
$dbname = "magneti_customfitness";

// $con = mysqli_connect("174.136.46.205","magneti_wpuser","MuseDB!","magneti_customfitness") or die ("could not connect database");


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

//if (is_ajax()) {
  if (isset($_REQUEST["location"]) && !empty($_REQUEST["location"])) { //Checks if location value exists
    $location = $_REQUEST["location"];
    $fitnessLevel = $_REQUEST["fitnessLevel"];
    $goal = $_REQUEST["goal"];
    $desiredWorkout = $_REQUEST["desiredWorkout"];

    switch($location) { //Switch case for value of action
      case "92020": query(); break;
    }
  }
//}

function query() {
  $data=array();
  $q=mysqli_query($conn,"select * from `Location` where Zipcode = '92020'");
  while ($row=mysqli_fetch_object($q)){
   $data[]=$row;
  }

  // HERE IS AN EXAMPLE OF LOGIC YOU WANT TO USE/CREATE 
  // if ($result->num_rows > 0) {
  //     // output data of each row
  //     while($row = $result->fetch_assoc()) {
  //         // echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
  //         $row;
  //     }
  // } else {
  //     echo "0 results";
  // }

  echo json_encode($data);
}


// THIS IS A TEST FUNCTION TO RETURN RESULTS IN JSON FORMAT
// NEED TO COMBINE THIS FUNCTION WITH THE "query" FUNCTiON
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

$conn->close(); 

?>