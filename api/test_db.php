<?php
/**
 * IITGEEPrep Engine v13.5 - Production Logic Core
 * REAL DATABASE OPERATIONS ONLY - NO MOCKING
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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    if ($raw === '{}' || $raw === '[]') {
        echo json_encode(["status" => "active", "message" => "Endpoint responsive"]);
        exit;
    }
}

if (!$conn) sendError($db_error ?? "Database not configured", 500);
$action = $_GET['action'] ?? 'status';

try {
    if ($action === 'check_integrity') {
        // Scan for common relational failures
        $orphans = $conn->query("SELECT COUNT(*) FROM user_progress WHERE user_id NOT IN (SELECT id FROM users)")->fetchColumn();
        sendSuccess(["integrity" => $orphans === 0 ? "OK" : "FAIL", "orphans" => $orphans]);
    }

    $tables = [];
    $res = $conn->query("SHOW TABLES");
    while ($row = $res.fetch(PDO::FETCH_NUM)) {
        $name = $row[0];
        $count = $conn->query("SELECT COUNT(*) FROM $name")->fetchColumn();
        $tables[] = ["name" => $name, "rows" => $count];
    }
    sendSuccess(["status" => "CONNECTED", "tables" => $tables, "version" => "v13.5"]);
} catch (Exception $e) { sendError($e->getMessage(), 500); }