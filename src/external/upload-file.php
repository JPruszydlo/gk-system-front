<?php
$uploaddir = "../assets/images/";
$fileName = basename($_FILES["file"]["name"]);
$dirName = $_POST["dirName"];

if(!empty($dirName)){
	$fileName = $dirName . "/" . $fileName;
}
$uploaddir = $uploaddir . $fileName;

if (move_uploaded_file($_FILES['file']['tmp_name'], $uploaddir )) {
    do {
        if (file_exists($uploaddir)) {
            break;
    	}
        sleep(200);
	
    } while(!file_exists("test.txt"));

    include 'list-images.php';
} else {
    echo json_encode("B³¹d, nie mo¿na za³adowaæ pliku");
}


?>