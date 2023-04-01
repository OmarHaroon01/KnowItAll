<?php

include '../config.php';

$input = file_get_contents("php://input");
$decode = json_decode($input, true);

$email = $decode["email"];
$password = $decode["password"];

$query = "SELECT * FROM knowitall.users WHERE knowitall.users.email= '$email'";
$output = mysqli_query($conn, $query);

if (mysqli_num_rows($output) !== 0) {
        $row = mysqli_fetch_assoc($output);
        $dbpassword = $row['password'];
        if (password_verify($password, $dbpassword)) {
                echo json_encode(["data" => "Good to go!", "error" => ""]);
                return;
        }
}
echo json_encode(["data" => "", "error" => "Invalid Credentials!"]);
// echo $query;

//echo json_encode(["success"=>$output,"message"=>"Login Succcessfully"]);
?>