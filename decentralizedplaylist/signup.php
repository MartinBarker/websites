<?php
require "conn.php";


echo "<br>";



$email = $_SERVER['QUERY_STRING']; //$_POST["email"];
echo "<br> email = $email <br>";

$mysql_qry = "insert into betaEmails (email) values ('$email')";

if($conn->query($mysql_qry) === TRUE){
    echo "insert success";
}else{
    echo "error: " .$mysql_qry . "<br>" . $conn->error;
}

$conn->close;
?>