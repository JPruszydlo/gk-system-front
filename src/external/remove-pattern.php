<?php
$pattern = $_POST["name"];

foreach (glob("../assets/" . $pattern) as $filename) {
    unlink($filename);
}

?>