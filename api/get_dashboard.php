<?php
/**
 * IITGEEPrep Engine v13.0 - Ultimate Sync Core
 * Production Backend Deployment
 */
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

include_once 'cors.php';
include_once 'config.php';

function getJsonInput() {
    $raw = file_get_contents('php://input');
    if (!$raw || $raw === '{}') return null;
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

// Global Health Check Handler
if ($_SERVER['REQUEST_METHOD'] === 'POST' && empty(file_get_contents('php://input'))) {
    echo json_encode(["status" => "active", "message" => "Logic hub is reachable"]);
    exit;
}

$userId = $_GET['user_id'] ?? '';
if (!$userId) sendError("Context ID required");
try {
    $res = [];
    $res['progress'] = $conn->query("SELECT * FROM user_progress WHERE user_id = '$userId'")->fetchAll();
    $res['attempts'] = $conn->query("SELECT * FROM test_attempts WHERE user_id = '$userId' ORDER BY date DESC")->fetchAll();
    $res['goals'] = $conn->query("SELECT * FROM goals WHERE user_id = '$userId'")->fetchAll();
    $res['backlogs'] = $conn->query("SELECT * FROM backlogs WHERE user_id = '$userId' ORDER BY created_at DESC")->fetchAll();
    $res['mistakes'] = $conn->query("SELECT * FROM mistake_logs WHERE user_id = '$userId' ORDER BY date DESC")->fetchAll();
    $res['timetable'] = $conn->query("SELECT * FROM timetable WHERE user_id = '$userId'")->fetch();
    $res['blogs'] = $conn->query("SELECT * FROM blog_posts ORDER BY date DESC LIMIT 10")->fetchAll();
    $res['flashcards'] = $conn->query("SELECT * FROM flashcards LIMIT 50")->fetchAll();
    $res['hacks'] = $conn->query("SELECT * FROM memory_hacks LIMIT 20")->fetchAll();
    $res['notifications'] = $conn->query("SELECT * FROM notifications WHERE to_id = '$userId' AND is_read = 0")->fetchAll();
    echo json_encode($res);
} catch (Exception $e) { sendError($e->getMessage(), 500); }