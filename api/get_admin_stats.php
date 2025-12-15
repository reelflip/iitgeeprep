<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';
 $visits = $conn->query("SELECT SUM(count) FROM analytics_visits")->fetchColumn(); $users = $conn->query("SELECT COUNT(*) FROM users")->fetchColumn(); $traffic = $conn->query("SELECT date, count as visits FROM analytics_visits ORDER BY date DESC LIMIT 7")->fetchAll(PDO::FETCH_ASSOC); echo json_encode(["totalVisits" => (int)$visits, "totalUsers" => (int)$users, "dailyTraffic" => array_reverse($traffic)]); ?>