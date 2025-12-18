<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

try {
    $stats = [];
    $stats['totalUsers'] = $conn->query("SELECT COUNT(*) FROM users")->fetchColumn();
    $stats['totalVisits'] = $conn->query("SUM(count) FROM analytics_visits")->fetchColumn() ?: 0;
    $stmt = $conn->query("SELECT date, count as visits FROM analytics_visits ORDER BY date DESC LIMIT 7");
    $stats['dailyTraffic'] = array_reverse($stmt->fetchAll(PDO::FETCH_ASSOC));
    echo json_encode($stats);
} catch(Exception $e) { http_response_code(500); echo json_encode(["error" => $e->getMessage()]); }
?>