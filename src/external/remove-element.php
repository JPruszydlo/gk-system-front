<?php
$dirName = $_POST["name"];
$dir = "../assets/$dirName";

if(!is_dir($dir)){
    unlink($dir);

} else {
    foreach (scandir($dir) as $item) {
        if ($item == '.' || $item == '..') {
            continue;
        }

        unlink("$dir/$item");
    }
    rmdir($dir);
}

include 'list-images.php';
?>