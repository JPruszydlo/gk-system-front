<?php
$uploaddir = "../assets/images/";
$files = json_decode($_POST["files"]);
$result = array();
$t = time();
foreach($files as $file)
{
    if($file[1] == null) {
	array_push($result, array($file[0], $file[1]));
    } else {
	if(file_exists($uploaddir . $file[0])) {
	    $data = file_get_contents($uploaddir . $file[0]);
	    $base64 = base64_encode($data);
	    if($file[1] == $base64) {
		array_push($result, array($file[0], $file[1]));
	    } else {
		$splitted = explode('.', $file[0]);
		$newFileName = $splitted[0] . $t . '.' . $splitted[1];
		array_push($result, array($newFileName, $file[1]));
		file_put_contents($uploaddir . $newFileName, base64_decode($file[1]));
	    }
	} else {
	    file_put_contents($uploaddir . $file[0], base64_decode($file[1]));
	    array_push($result, array($file[0], $file[1]));
	}
    }
}
echo json_encode($result);

?>