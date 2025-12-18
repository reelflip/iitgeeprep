<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$today = date('Y-m-d');
try {
    $conn->prepare("INSERT INTO analytics_visits (date, count) VALUES (?, 1) ON DUPLICATE KEY UPDATE count = count + 1")->execute([$today]);
    echo json_encode(["status" => "ok"]);
} catch(Exception $e) {}
?>