<?php
/**
 * IITGEEPrep Engine v13.4 - Production Logic Core
 * Fix: Data integrity for Admin Dashboards (Prevents JS .map() crashes)
 */
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

include_once 'cors.php';
include_once 'config.php';

function getJsonInput() {
    $raw = file_get_contents('php://input');
    if (!$raw || $raw === '{}' || $raw === '[]') return null;
    $data = json_decode($raw);
    return (json_last_error() === JSON_ERROR_NONE) ? $data : null;
}

function getV($data, $p, $default = null) {
    if (!$data) return $default;
    if (isset($data->$p)) return $data->$p;
    $snake = strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $p));
    if (isset($data->$snake)) return $data->$snake;
    return $default;
}

function sendError($msg, $code = 400) {
    http_response_code($code);
    echo json_encode(["status" => "error", "message" => $msg]);
    exit;
}

function sendSuccess($data = []) {
    echo json_encode(array_merge(["status" => "success"], $data));
    exit;
}

/**
 * Health Check Bypass
 */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    if ($raw === '{}' || $raw === '[]') {
        echo json_encode(["status" => "active", "message" => "Endpoint responsive"]);
        exit;
    }
}

try {
    $res = [
        "totalVisits" => (int)$conn->query("SELECT SUM(count) FROM analytics_visits")->fetchColumn() ?: 0,
        "totalUsers" => (int)$conn->query("SELECT COUNT(*) FROM users")->fetchColumn() ?: 0,
        "dailyTraffic" => $conn->query("SELECT date, count as visits FROM analytics_visits ORDER BY date DESC LIMIT 7")->fetchAll()
    ];
    echo json_encode($res);
} catch (Exception $e) { sendError($e->getMessage(), 500); }