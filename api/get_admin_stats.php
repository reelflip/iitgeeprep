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

$totalUsers = $conn->query("SELECT COUNT(*) FROM users")->fetchColumn();
$totalVisits = 12450; 
$dailyTraffic = [
    ["date" => "Mon", "visits" => 120],
    ["date" => "Tue", "visits" => 135],
    ["date" => "Wed", "visits" => 125],
    ["date" => "Thu", "visits" => 158],
    ["date" => "Fri", "visits" => 190],
    ["date" => "Sat", "visits" => 175],
    ["date" => "Sun", "visits" => 160]
];

echo json_encode([
    "totalUsers" => $totalUsers,
    "totalVisits" => $totalVisits,
    "dailyTraffic" => $dailyTraffic
]);
?>