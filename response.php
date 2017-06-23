<?php

//if (is_ajax()) {
  if (isset($_REQUEST["location"]) && !empty($_REQUEST["location"])) { //Checks if location value exists
    $location = $_REQUEST["location"];
    $fitnessLevel = $_REQUEST["fitnessLevel"];
    $goal = $_REQUEST["goal"];
    $desiredWorkout = $_REQUEST["desiredWorkout"];

    switch($location) { //Switch case for value of action
      case "92111": test_function(); break;
    }
  }
//}

//Function to check if the request is an AJAX request
// function is_ajax() {
//   return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
// }

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

/// TEST - We can use something like this to return data
// $servername = "localhost";
// $username = "root";
// $password = "1234";
// $dbname = "Custom_fitness";

// $con = mysqli_connect("174.136.46.205","magneti_wpuser","MuseDB!","magneti_customfitness") or die ("could not connect database");


// // Create connection
// $conn = new mysqli($servername, $username, $password, $dbname);
// // Check connection
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// } 

// $sql = "SELECT id, firstname, lastname FROM MyGuests";
// $result = $conn->query($sql);

// if ($result->num_rows > 0) {
//     // output data of each row
//     while($row = $result->fetch_assoc()) {
//         echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
//     }
// } else {
//     echo "0 results";
// }
$conn->close(); 
/// END TEST 

}
?>