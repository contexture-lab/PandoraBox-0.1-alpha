<?php
extract($_POST, EXTR_SKIP);
$dataget = $_GET;

require_once "config.php";
require 'app/rb.php';
require 'app/func.php';
require 'app/keys.php';
require 'lang/arrlangs.php';
$langreq = "lang/".$pblanguage.".php";
require $langreq;

session_start();

$dsn = 'mysql:host='.$dbhost.';dbname='.$dbname;
R::setup( $dsn, $dblogin, $dbpassword );
R::freeze(true);
$isConnected = R::testConnection();
if ($isConnected) {
	if (isset($dataget['confirm'])) {
		require 'app/confirm.php';
	} elseif (isset($dataget['change'])) {
		require 'app/change.php';
	} else {
		require 'app/auth.php';
	}
} else {
	echo $locale['unable_to_connect_to_the_database'];
}
?>
