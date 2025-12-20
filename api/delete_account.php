<?php
/**
 * IITGEEPrep Pro Engine v12.27
 * Production Backend Infrastructure
 * Optimized for Hostinger/LAMP Stack
 */
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$uid = $_GET['user_id'];
$conn->prepare("DELETE FROM users WHERE id = ?")->execute([$uid]);
echo json_encode(["status" => "success"]);
?>