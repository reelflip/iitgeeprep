<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'config.php';

// Simple hit counter
$today = date('Y-m-d');
$conn->query("INSERT INTO analytics_visits (date, count) VALUES ('$today', 1) ON DUPLICATE KEY UPDATE count = count + 1");
echo json_encode(["status" => "tracked"]);
?>