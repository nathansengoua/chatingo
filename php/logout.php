<?php
include '../includes/auth.php';
session_start();

logout();
header("Location: ../index.php");
exit();
?>
