<?php
	include("./project.class.php");

	$param = json_decode(file_get_contents('php://input'),true); 
	$projects = new Projects(0, '127.0.0.1', 'project_db', 'php_local_user', 'php_local_user');
	// print_r($param);
	// $param = array([
	// 'id' => 8,
	// 'fl' => 0
	// ]);
	// print_r($param);
	// echo $projects->getProject($param);
	echo json_encode($projects->getProjectEquipment($param));
?>