<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'config.php';

$visits = $conn->query("SELECT SUM(count) FROM analytics_visits")->fetchColumn();
$users = $conn->query("SELECT COUNT(*) FROM users")->fetchColumn();
$traffic = $conn->query("SELECT date, count as visits FROM analytics_visits ORDER BY date DESC LIMIT 7")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode([
    "totalVisits" => (int)$visits,
    "totalUsers" => (int)$users,
    "dailyTraffic" => array_reverse($traffic)
]);
?>