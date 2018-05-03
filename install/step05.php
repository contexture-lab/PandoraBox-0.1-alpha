<?php
if ($is_complite) {
	try {
		$sql = "INSERT INTO `users` (`id`, `name`, `role`, `status`, `password`, `chpassw`, `email`, `phone`, `fname`, `address`, `comment`, `latitude`, `longitude`, `accuracy`, `lastactive`) VALUES (NULL, 'admin', 'admin;', '1', '".sha1('admin')."', '".sha1('admin'.time())."', 'admin@', '0000', 'Real Name', 'Address', 'First Administrator', '0', '0', '0', '".time()."');";
		R::exec($sql);

		$sql = "INSERT INTO `users` (`id`, `name`, `role`, `status`, `password`, `chpassw`, `email`, `phone`, `fname`, `address`, `comment`, `latitude`, `longitude`, `accuracy`, `lastactive`) VALUES (NULL, 'officer', 'officer;', '1', '".sha1('officer')."', '".sha1('officer'.time())."', 'officer@', '0000', 'Real Name', 'Address', 'First Officer', '0', '0', '0', '".time()."');";
		R::exec($sql);

		$sql = "INSERT INTO `users` (`id`, `name`, `role`, `status`, `password`, `chpassw`, `email`, `phone`, `fname`, `address`, `comment`, `latitude`, `longitude`, `accuracy`, `lastactive`) VALUES (NULL, 'accaunter', 'accaunter;', '1', '".sha1('accaunter')."', '".sha1('accaunter'.time())."', 'accaunter@', '0000', 'Real Name', 'Address', 'First Accaunter', '0', '0', '0', '".time()."');";
		R::exec($sql);

		$sql = "INSERT INTO `users` (`id`, `name`, `role`, `status`, `password`, `chpassw`, `email`, `phone`, `fname`, `address`, `comment`, `latitude`, `longitude`, `accuracy`, `lastactive`) VALUES (NULL, 'unit', 'unit;', '1', '".sha1('unit')."', '".sha1('unit'.time())."', 'unit@', '0000', 'Real Name', 'Address', 'First Unit', '0', '0', '0', '".time()."');";
		R::exec($sql);

		$sql = "INSERT INTO `users` (`id`, `name`, `role`, `status`, `password`, `chpassw`, `email`, `phone`, `fname`, `address`, `comment`, `latitude`, `longitude`, `accuracy`, `lastactive`) VALUES (NULL, 'ghost', 'ghost;', '1', '".sha1('ghost')."', '".sha1('ghost'.time())."', 'ghost@', '0000', 'Real Name', 'Address', 'First Ghost', '0', '0', '0', '".time()."');";
		R::exec($sql);

		$sql = "INSERT INTO `users` (`id`, `name`, `role`, `status`, `password`, `chpassw`, `email`, `phone`, `fname`, `address`, `comment`, `latitude`, `longitude`, `accuracy`, `lastactive`) VALUES (NULL, 'mixed', 'admin;unit;', '1', '".sha1('mixed')."', '".sha1('mixed'.time())."', 'mixed@', '0000', 'Real Name', 'Address', 'First mixed', '0', '0', '0', '".time()."');";
		R::exec($sql);

		$sql = "INSERT INTO `docs` (`id`, `name`, `status`, `body`) VALUES (NULL, 'Start document', '1', 'Start document.');";
		R::exec($sql);

		$sql = "INSERT INTO `messages` (`id`, `type`, `from`, `to`, `status`, `time`, `body`) VALUES (NULL, 'forall', 0, 0, '1', '".time()."', 'First message for all.');";
		R::exec($sql);

		$sql = "INSERT INTO `targets` (`id`, `name`, `status`, `latitude`, `longitude`) VALUES (NULL, 'Start target', 0, '0', '0');";
		R::exec($sql);

		$sql = "INSERT INTO `orders` (`id`, `type`, `name`, `status`, `value`, `body`) VALUES (NULL, 'oneorder', 'Start command', 0, 'price=2;discount=1;compensation=1;penalty=1;', 'typeord=one;target=yes;msgstart=Starting Message;msgfinish=Finished Message;');";
		R::exec($sql);

		$sql = "INSERT INTO `tasks` (`id`, `userid`, `type`, `orderid`, `status`, `body`) VALUES (NULL, 4, 'oneorder', 1, 0, 'nobody;');";
		R::exec($sql);

		echo '<li><i class="fa-li fa fa-check" style="color: green;"></i>Startup users added.</li>';
	} catch (Exception $e) {
		$is_complite = false;
		echo '<li><i class="fa-li fa fa-ban" style="color: red;"></i>Failed to add startup users.</li>';
	}
} else echo '<li><i class="fa-li fa fa-ban" style="color: red;"></i>The operation can not be performed because the previous operation was not performed.</li>';
?>
