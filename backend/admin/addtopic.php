<?php
include '../config.php';


$topicName = $_POST["topic"];
$topicDescription = $_POST["description"];

$targetDir = "../images/topiclogos/";
$filename = basename($_FILES['image']['name']);
$targetFilePath = $targetDir . $filename;
$fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

// Allow certain file formats
$allowTypes = array('jpg', 'png', 'jpeg');
if (in_array($fileType, $allowTypes)) {
    // Upload file to server
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
        $query = "INSERT INTO knowitall.topics VALUES ('$topicName','$filename', '$topicDescription');";
        if (mysqli_query($conn, $query)) {
            echo json_encode(["data" => "Succesfully Added Topic", "error" => ""]);
        }

    } else {
        echo json_encode(["data" => "", "error" => "Sorry, there was an error uploading your file."]);

    }
} else {
    echo json_encode(["data" => "", "error" => "Sorry, only JPG, JPEG, PNG files are allowed to upload."]);
}


?>