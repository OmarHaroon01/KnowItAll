<?php

include '../config.php';

$input = file_get_contents("php://input");

$decode = json_decode($input, true);

$deleteUserEmail = mysqli_real_escape_string($conn, $decode["useremail"]);

$query = "UPDATE knowitall.users SET knowitall.users.active = 0 WHERE knowitall.users.email= '$deleteUserEmail';";
$output = mysqli_query($conn, $query);

if ($output) {
    echo json_encode(["data" => "Succesfully Deleted User", "error" => ""]);
}
else echo json_encode(["data" => "", "error" => "Fiiiiix"]);
?>