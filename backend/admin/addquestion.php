<?php

include '../config.php';

$input = file_get_contents("php://input");

$decode = json_decode($input, true);

$unid = uniqid();
$topic = $decode["topic"];
$question = $decode["question"];
$optionOne = $decode["optionOne"];
$optionTwo = $decode["optionTwo"];
$optionThree = $decode["optionThree"];
$optionFour = $decode["optionFour"];
$answer = $decode["correctAnswer"];



$sql = "INSERT INTO knowitall.questions (questionID, topic, question, optionOne,
        optionTwo, optionThree, optionFour, answer)
        VALUES ('$unid', '$topic', '$question', '$optionOne', '$optionTwo', '$optionThree',
        '$optionFour','$answer')";

if (mysqli_query($conn, $sql)) {
        echo json_encode(["data" => "Succesfully Added Question", "error" => ""]);
}


?>