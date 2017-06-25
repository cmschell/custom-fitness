<?php
include "db.php";
if(!empty($_POST["allbooks"])){
  /* DO YOUR QUERY HERE AND GET THE OUTPUT YOU WANT */
  $output="SELECT * FROM Location WHERE Zipcode is '92117'";
  echo json_encode(output) /* PRINT THE OUTPUT YOU WANT, IT WILL BE RETURNED TO THE ORIGINAL PAGE */
}
?>