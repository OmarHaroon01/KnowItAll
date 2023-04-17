<?php

include '../config.php';

$input = file_get_contents("php://input");

$decode = json_decode($input, true);

$unid = $decode["unid"];

$sql = "SELECT * FROM knowitall.users where unid = '$unid';";

$output = mysqli_query($conn, $sql);

if (mysqli_num_rows($output) !== 0) {
    echo json_encode(["data" => "Valid UNID", "error" => ""]);
    return;
}
echo json_encode(["data" => "", "error" => "Invalid UNID!"]);




?>