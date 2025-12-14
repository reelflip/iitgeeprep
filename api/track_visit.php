<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$today = date('Y-m-d');
$conn->query("INSERT INTO analytics_visits (date, count) VALUES ('$today', 1) ON DUPLICATE KEY UPDATE count = count + 1");
echo json_encode(["status" => "tracked"]);
?>