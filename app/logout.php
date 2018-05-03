<?php
require_once "../config.php";
require 'rb.php';
require 'func.php';

session_start();
$user = $_SESSION['logged_user'];

$dsn = 'mysql:host='.$dbhost.';dbname='.$dbname;
R::setup( $dsn, $dblogin, $dbpassword );
R::freeze(true);
$isConnected = R::testConnection();

if ($isConnected) {
	writeLog("signout", $user->id, 0, "", "");
}

unset($user);
unset($_SESSION['logged_user']);
unset($_SESSION['pb_intrface']);

header("Location: http://".$_SERVER['HTTP_HOST']."/");
?>
