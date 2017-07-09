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

  if (isset($_REQUEST["name"]) && !empty($_REQUEST["name"])) { //Checks if list value exists
    // Collect variables from cookies set on preferences_a.html
    $exName = $_REQUEST["name"];
  }

  $nameQuery = "SELECT exercise_name, exercise_video, exercise_desc FROM Equipment WHERE exercise_name = '$exName'"; 

  $exerciseInfoResult = mysql_query($nameQuery);

  $exerciseData=array();

  if($exerciseInfoResult) {
    while($row = mysql_fetch_array($exerciseInfoResult)){
      $exerciseData[]=$row;
    }
  }

  echo json_encode($exerciseData);
?>