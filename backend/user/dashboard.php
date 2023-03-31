<?php

include '../config.php';

$input = file_get_contents("php://input");

$decode = json_decode($input, true);

$unid = $decode["unid"];
// echo $unid;

$sql = "SELECT knowitall.users.fullName, knowitall.quiz_info.topic, knowitall.quiz_info.score,
knowitall.quiz_info.time
 FROM knowitall.users LEFT JOIN 
knowitall.quiz_info ON knowitall.users.unid=knowitall.quiz_info.userID 
where unid = '$unid' ORDER BY knowitall.quiz_info.time DESC;";

$output = mysqli_query($conn, $sql);

$rows = array();
while($row = mysqli_fetch_assoc($output))
{
    // echo $row;
    $rows[] = $row;
}
echo json_encode($rows);

// if ($output) {
//     echo json_encode(["data" => $output]);
// }


    ?>