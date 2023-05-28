<?php

include '../config.php';

$input = file_get_contents("php://input");
$decode = json_decode($input, true);

$email = mysqli_real_escape_string($conn, $decode["email"]);
$password = mysqli_real_escape_string($conn, $decode["password"]);


$query = "SELECT * FROM knowitall.users WHERE knowitall.users.email= '$email'";
$output = mysqli_query($conn, $query);

if (mysqli_num_rows($output) !== 0) {
        $row = mysqli_fetch_assoc($output);
        $dbpassword = $row["password"] ;
        if (password_verify($password, $dbpassword)) {
                if(strcmp($row["active"], "0") == 0) {
                        echo json_encode(["data" => "", "error" => "Contact Admin you have been banned"]);
                        return;   
                } else {
                        echo json_encode(["data" =>  $row["unid"], "error" => ""]);
                        return;
                }
        }
}
echo json_encode(["data" => "", "error" => "Invalid Credentials!"]);


?>