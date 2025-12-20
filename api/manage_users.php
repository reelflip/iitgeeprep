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
if ($method === 'GET') {
    $group = $_GET['group'] ?? 'USERS';
    $sql = $group === 'ADMINS' ? "SELECT * FROM users WHERE role LIKE 'ADMIN%'" : "SELECT * FROM users WHERE role NOT LIKE 'ADMIN%'";
    echo json_encode($conn->query($sql)->fetchAll());
} else if ($method === 'PUT') {
    $data = getJsonInput();
    $conn->prepare("UPDATE users SET is_verified = ? WHERE id = ?")->execute([getV($data, 'isVerified') ? 1 : 0, getV($data, 'id')]);
    echo json_encode(["status" => "success"]);
} else if ($method === 'DELETE') {
    $conn->prepare("DELETE FROM users WHERE id = ?")->execute([$_GET['id']]);
    echo json_encode(["status" => "success"]);
}