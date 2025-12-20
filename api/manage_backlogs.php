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
    if (!$raw) return null;
    $data = json_decode($raw);
    return (json_last_error() === JSON_ERROR_NONE) ? $data : null;
}

function getV($data, $p) {
    if (!$data) return null;
    if (isset($data->$p)) return $data->$p;
    $snake = strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $p));
    if (isset($data->$snake)) return $data->$snake;
    return null;
}

$method = $_SERVER['REQUEST_METHOD'];
$data = getJsonInput();
if ($method === 'POST') {
    $id = 'bl_' . uniqid();
    $stmt = $conn->prepare("INSERT INTO backlogs (id, user_id, title, subject, priority, status, deadline) VALUES (?, ?, ?, ?, ?, 'PENDING', ?)");
    $stmt->execute([$id, getV($data, 'userId'), getV($data, 'topic'), getV($data, 'subject'), getV($data, 'priority'), getV($data, 'deadline')]);
    echo json_encode(["status" => "success", "id" => $id]);
} else if ($method === 'PUT') {
    $conn->prepare("UPDATE backlogs SET status = 'COMPLETED' WHERE id = ?")->execute([getV($data, 'id')]);
    echo json_encode(["status" => "success"]);
} else if ($method === 'DELETE') {
    $conn->prepare("DELETE FROM backlogs WHERE id = ?")->execute([$_GET['id']]);
    echo json_encode(["status" => "success"]);
}