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

$data = getJsonInput();
try {
    $notId = getV($data, 'notificationId');
    $action = getV($data, 'action');
    if ($action === 'ACCEPT') {
        $not = $conn->query("SELECT from_id, to_id FROM notifications WHERE id='$notId'")->fetch();
        if ($not) {
            $conn->prepare("UPDATE users SET parent_id=? WHERE id=?")->execute([$not['from_id'], $not['to_id']]);
            $conn->prepare("UPDATE users SET linked_student_id=? WHERE id=?")->execute([$not['to_id'], $not['from_id']]);
        }
    }
    $conn->prepare("DELETE FROM notifications WHERE id=?")->execute([$notId]);
    sendSuccess();
} catch (Exception $e) { sendError($e->getMessage(), 500); }