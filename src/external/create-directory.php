<?php
$dirName = $_POST["name"];
$dir = "../assets/images/$dirName";
mkdir($dir);

include 'list-images.php';
?>