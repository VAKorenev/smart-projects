<?php
	include("./project.class.php");

	parse_str(parse_url($_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'], PHP_URL_QUERY), $param);

	$projects = new Projects(0, '127.0.0.1', 'project_db', 'php_local_user', 'php_local_user');

	echo json_encode($projects->getAllProjects($param));
?>