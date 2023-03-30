<?php

include 'config.php';

        $input=file_get_contents("php://input");
        $decode=json_decode($input,true);
    
        $name=$decode["name"];
        echo json_encode(["success"=>$name,"message"=>"Student Add Succcessfully"]);
?>