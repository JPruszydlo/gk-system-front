<?php
$uploaddir = "../assets/";
$fileName = $_POST["fileName"];
$base64string = $_POST["base64string"];

file_put_contents($uploaddir . $fileName, base64_decode($base64string));

echo json_encode("OK");
?>