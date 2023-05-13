<?php
include '../config.php';

$input = file_get_contents("php://input");
$decode = json_decode($input, true);

$topic = $decode["topic"];

$query = "SELECT * FROM knowitall.quiz_info WHERE topic = '$topic' ORDER BY score DESC, time ASC;";
$output = mysqli_query($conn, $query);
$rows = array();
while ($row = mysqli_fetch_assoc($output)) {

    $rows[] = $row;
}

echo json_encode(["data" => $rows, "error" => ""]);


?>