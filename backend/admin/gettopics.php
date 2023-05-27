<?php

include '../config.php';

$sql = "SELECT knowitall.topics.topicName FROM knowitall.topics";
$output = mysqli_query($conn, $sql);
$rows = array();
while ($row = mysqli_fetch_assoc($output)) {
    // echo $row;
    $rows[] = $row;
}

echo json_encode(["data" => $rows, "error" => ""]);


?>