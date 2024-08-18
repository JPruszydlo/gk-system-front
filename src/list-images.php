<?php
$arrFiles = array();
$dirPath = "./assets/images";


$files = scandir($dirPath);
foreach ($files as $file) {
    $filePath = $dirPath . '/' . $file;
    if (is_file($filePath)) {
        echo $file . ";";
    }
}
?>