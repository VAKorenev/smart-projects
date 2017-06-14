<?php
	include("./project.class.php");

	$param = json_decode(file_get_contents('php://input'),true); 
	$projects = new Projects(0, '127.0.0.1', 'project_db', 'php_local_user', 'php_local_user');
	echo json_encode($projects->deleteMaterial($param));
?>