<?php
$localhost="127.0.0.1";
$username="root";
$password="";

$conn=mysqli_connect($localhost,$username,$password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$query = "CREATE DATABASE IF NOT EXISTS KnowItAll";
if(mysqli_query($conn, $query)){
    
    //Creating user table
    $query = "CREATE TABLE IF NOT EXISTS knowitall.users (
        unid VARCHAR(255) PRIMARY KEY,
        fullName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    )";

    $output = mysqli_query($conn, $query);
    

    //Creating question table
    $query = "CREATE TABLE IF NOT EXISTS knowitall.questions (
        questionID VARCHAR(255) PRIMARY KEY,
        topic VARCHAR(255) NOT NULL,
        question VARCHAR(255) NOT NULL,
        optionOne VARCHAR(255) NOT NULL,
        optionTwo VARCHAR(255) NOT NULL,
        optionThree VARCHAR(255) NOT NULL,
        optionFour VARCHAR(255) NOT NULL,
        answer VARCHAR(255) NOT NULL
    )";
    $output = mysqli_query($conn, $query);
    
    //Response Table
    $query = "CREATE TABLE IF NOT EXISTS knowitall.response (
        userID VARCHAR(255),
        questionID VARCHAR(255),
        FOREIGN KEY (userID) REFERENCES users(unid),
        FOREIGN KEY (questionID) REFERENCES questions(questionID),
        correctAnswer VARCHAR(255) NOT NULL
    )";
    $output = mysqli_query($conn, $query);

    $query = "CREATE TABLE IF NOT EXISTS knowitall.quiz_info (
        userID VARCHAR(255),
        topic VARCHAR(255),
        FOREIGN KEY (userID) REFERENCES users(unid)
    )";

    $output = mysqli_query($conn, $query);  
} else {
    die("Connection failed: " . "Error in making DB");
}

 ?> 

