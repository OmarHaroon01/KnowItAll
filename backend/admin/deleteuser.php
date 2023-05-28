<?php

include '../config.php';

$input = file_get_contents("php://input");

$decode = json_decode($input, true);

$deleteUserEmail = mysqli_real_escape_string($conn, $decode["useremail"]);

$query = "SELECT * FROM knowitall.users WHERE 
knowitall.users.email= '$deleteUserEmail' AND knowitall.users.active = 1;";
$output = mysqli_query($conn, $query);

if (mysqli_num_rows($output) !== 0) {
    $query = "UPDATE knowitall.users SET knowitall.users.active = 0 WHERE 
    knowitall.users.email= '$deleteUserEmail' AND knowitall.users.active = 1;";
    $output = mysqli_query($conn, $query);

    if ($output) {
        echo json_encode(["data" => "Succesfully Deleted User", "error" => ""]);
    }
    else 
        echo json_encode(["data" => "", "error" => "Error Deleting"]);
} else {
    echo json_encode(["data" => "", "error" => "No User Found"]);
}


?>