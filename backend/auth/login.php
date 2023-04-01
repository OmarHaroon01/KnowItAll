<?php

include 'config.php';

        $input=file_get_contents("php://input");
        $decode=json_decode($input,true);
    
        $email=$decode["email"];
        $password=$decode["password"];

        $query = "SELECT * FROM knowitall.users WHERE email = '$email';";
        $output = mysqli_query($conn, $query);

        echo $query;

        //echo json_encode(["success"=>$output,"message"=>"Login Succcessfully"]);
?>