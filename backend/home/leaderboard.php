<?php
include '../config.php';

$input = file_get_contents("php://input");
$decode = json_decode($input, true);

$topic = $decode["topic"];

// $query = "SELECT * FROM knowitall.quiz_info WHERE topic = '$topic' ORDER BY score DESC, time ASC;";

if ($topic == "all") {
    $query = "SELECT knowitall.quiz_info.topic, knowitall.quiz_info.score, knowitall.users.fullName FROM knowitall.quiz_info INNER JOIN 
knowitall.users ON knowitall.users.unid=knowitall.quiz_info.userID ORDER BY score DESC, time ASC LIMIT 10;";
} else {
    $query = "SELECT knowitall.quiz_info.topic, knowitall.quiz_info.score, knowitall.users.fullName FROM knowitall.quiz_info INNER JOIN 
knowitall.users ON knowitall.users.unid=knowitall.quiz_info.userID WHERE topic = '$topic' ORDER BY score DESC, time ASC LIMIT 10;";
}
$output = mysqli_query($conn, $query);
$rows = array();
while ($row = mysqli_fetch_assoc($output)) {

    $rows[] = $row;
}

echo json_encode(["data" => $rows, "error" => ""]);


?>