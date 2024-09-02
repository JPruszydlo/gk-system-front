<?php
header('Content-Type: application/json');

$dir = "../assets/images/";
$files = array();
$directories = array();  
$scanResult = scandir($dir);

foreach ($scanResult as $file) {
    if (is_dir("$dir/$file") and $file != "." and $file != "..") {
	$dirFiles = array();
	$dirScan = scandir("$dir/$file");
	foreach($dirScan as $dirFile) {
	    if ($dirFile != "." and $dirFile != "..") {
	    	array_push($dirFiles, ["name" => "$file/$dirFile", "isFile" => true, "mimeType" => mime_content_type("$dir/$file/$dirFile")]);
	    }
	}
	      
	array_push($directories, ["name" => $file, "isFile" => false, "files" => $dirFiles]);
    }
    if (!is_dir("$dir/$file") and $file != "." and $file != "..") {
      array_push($files, ["name" => $file, "isFile" => true, "mimeType" => mime_content_type("$dir/$file")]);
    }
}

$merged = array_merge($directories, $files);
echo json_encode($merged);


