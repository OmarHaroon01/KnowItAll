<?php

include 'config.php';

        $input=file_get_contents("php://input");
        $decode=json_decode($input,true);
    
        $email=$decode["email"];
        $password=$decode["password"];
        
        echo json_encode(["success"=>$email,"message"=>"Login Succcessfully"]);
?>