<?php

include '../config.php';

$input = file_get_contents("php://input");
$decode = json_decode($input, true);

$unid = uniqid();
$fullName = $decode["fullName"];
$email = $decode["email"];
$password = $decode["password"];

$sql = "SELECT * FROM knowitall.users WHERE knowitall.users.email= '$email'";

$output = mysqli_query($conn, $sql);

if (mysqli_num_rows($output) !== 0) {
        echo json_encode(["data" => "", "error" => 'Email already registered']);
} else {
        $sql = "INSERT INTO knowitall.users (unid, fullName, email, password)
 VALUES ($unid, $fullName, $email, $password);";

        $output = mysqli_query($conn, $sql);
       // echo json_encode(["data" => "Register Successfully!", "error" => ""]);
        echo json_encode(["data" => "$output", "error" => ""]);


}

?>