<?php

include '../config.php';

$input = file_get_contents("php://input");
$decode = json_decode($input, true);

$topic = mysqli_real_escape_string($conn, $decode['topic']);

$sql = "SELECT * FROM knowitall.questions WHERE knowitall.questions.topic= '$topic'";

$output = mysqli_query($conn, $sql);

$rows = array();
while($row = mysqli_fetch_assoc($output))
{
    // apppending each row to array rows
    $rows[] = $row;
}

echo json_encode(["data" => $rows, "error" => ""]);



?>