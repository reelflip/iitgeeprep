<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

// Simple counter file or DB log
$file = 'visits.txt';
$count = file_exists($file) ? (int)file_get_contents($file) : 0;
file_put_contents($file, $count + 1);
echo json_encode(["status" => "ok"]);
?>