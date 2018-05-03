<?php
extract($_POST, EXTR_SKIP);
extract($_GET, EXTR_SKIP);

require_once "../config.php";
require 'rb.php';
require 'func.php';
require '../lang/arrlangs.php';
$langreq = "../lang/".$pblanguage.".php";
require $langreq;

session_start();

$dsn = 'mysql:host='.$dbhost.';dbname='.$dbname;
R::setup( $dsn, $dblogin, $dbpassword );
R::freeze(true);
$isConnected = R::testConnection();
if ($isConnected) {
	if (isset($_SESSION['logged_user'])) {
	 	$user = $_SESSION['logged_user'];
	 	$userconf = R::findOne('users', 'id = ?', array($user->id));
	 	if ($user->password == $userconf->password) {
	 		if (isset($oper)) {
	 			require 'ajaxoper.php';
	 		} elseif (isset($unit)) {
	 			require 'ajaxunit.php';
	 		} elseif (isset($sys)) {
	 			require 'ajaxsys.php';
	 		} else {
	 			echo $locale['unknown_command'];
	 		}
	 	} else {
	 		unset($_SESSION['logged_user']);
	 		unset($_SESSION['pb_intrface']);
	 		unset($user);
	 		echo $locale['access_denied'];
	 	}
	} else {
		echo $locale['access_denied'];
	}
} else {
	echo $locale['unable_to_connect_to_the_database'];
}
?>
