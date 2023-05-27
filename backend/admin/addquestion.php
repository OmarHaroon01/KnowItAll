<?php

include '../config.php';

$input = file_get_contents("php://input");

$decode = json_decode($input, true);

$unid = uniqid();
$topic = mysqli_real_escape_string($conn, $decode["topic"]);
$question = mysqli_real_escape_string($conn, $decode["question"]);
$optionOne = mysqli_real_escape_string($conn, $decode["optionOne"]);
$optionTwo = mysqli_real_escape_string($conn, $decode["optionTwo"]);
$optionThree = mysqli_real_escape_string($conn, $decode["optionThree"]);
$optionFour = mysqli_real_escape_string($conn, $decode["optionFour"]);
$answer = mysqli_real_escape_string($conn, $decode["correctAnswer"]);



$sql = "INSERT INTO knowitall.questions (questionID, topic, question, optionOne,
        optionTwo, optionThree, optionFour, answer)
        VALUES ('$unid', '$topic', '$question', '$optionOne', '$optionTwo', '$optionThree',
        '$optionFour','$answer')";

if (mysqli_query($conn, $sql)) {
        echo json_encode(["data" => "Succesfully Added Question", "error" => ""]);
}


?>