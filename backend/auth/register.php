<?php

include '../config.php';

$input = file_get_contents("php://input");
$decode = json_decode($input, true);

$unid = uniqid();
$fullName = mysqli_real_escape_string($conn, $decode["fullName"]);
$email = mysqli_real_escape_string($conn, $decode["email"]);
$password = password_hash(mysqli_real_escape_string($conn, $decode["password"]), PASSWORD_DEFAULT);

$sql = "SELECT * FROM knowitall.users WHERE knowitall.users.email= '$email'";

$output = mysqli_query($conn, $sql);

if (mysqli_num_rows($output) !== 0) {
        echo json_encode(["data" => "", "error" => 'Email already registered']);
} else {
        $sql = "INSERT INTO knowitall.users (unid, fullName, email, password, active)
 VALUES ('$unid', '$fullName', '$email', '$password', TRUE);";


        if (mysqli_query($conn, $sql)) {
                echo json_encode(["data" => "Registration Successfull!", "error" => ""]);
        }
}

?>