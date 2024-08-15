<?php
//database configurations
$hostname= "localhost";
$username = "root";
$password = "";
$dbname = "chatingoDB";

try{
    $conn = new PDO("mysql:host=$hostname;dbname=$dbname",$username,$password);
    $conn->setAttribute(pdo::ATTR_ERRMODE, pdo::ERRMODE_EXCEPTION);
}catch(PDOException $ex){
    echo "Connection Failed: ".$ex->getMessage();
}
?>