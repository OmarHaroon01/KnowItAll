<?php

include '../config.php';

$input = file_get_contents("php://input");

$decode = json_decode($input, true);

$unid = mysqli_real_escape_string($conn, $decode["unid"]);
$topic = mysqli_real_escape_string($conn, $decode["topic"]);
$correctAnswer = mysqli_real_escape_string($conn, $decode["correctAnswer"]);
$answersPicked = $decode["answersPicked"];

$score = 0;
$i = 0;

foreach ($answersPicked as $selectedOption) {
    if ($selectedOption == $correctAnswer[$i++]) {
        $score++;
    }
}

$sql = "INSERT INTO knowitall.quiz_info (userID, topic, score) VALUES ('$unid', '$topic', '$score');";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["data" => "Quiz Submitted Successfully!\nYour score is '$score'", "error" => ""]);
} else {
    echo json_encode(["data" => "", "error" => "Error submitting quiz"]);
}
?>