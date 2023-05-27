<?php

include '../config.php';
$input = file_get_contents("php://input");
$decode = json_decode($input, true);

$search = mysqli_real_escape_string($conn, $decode["search"]);

$sql = "SELECT * FROM knowitall.topics WHERE knowitall.topics.topicName LIKE '%$search%'
        OR knowitall.topics.topicDescription LIKE '%$search%'";

$output = mysqli_query($conn, $sql);

$rows = array();
while ($row = mysqli_fetch_assoc($output)) {
    $rows[] = $row;
}

echo json_encode(["data" => $rows, "error" => ""]);





?>