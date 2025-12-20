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

$date = date('Y-m-d');
$conn->query("INSERT INTO analytics_visits (date, count) VALUES ('$date', 1) ON DUPLICATE KEY UPDATE count = count + 1");
echo json_encode(["status" => "success"]);
?>