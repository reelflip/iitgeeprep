<?php
/**
 * IITGEEPrep Unified Sync Engine v17.0
 * PRODUCTION CORE - STRICT MYSQL PDO
 */
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once 'config.php';

function getJsonInput() {
    $raw = file_get_contents('php://input');
    if (!$raw) return null;
    $data = json_decode($raw);
    return (json_last_error() === JSON_ERROR_NONE) ? $data : null;
}

function sendError($msg, $code = 400, $details = null) {
    http_response_code($code);
    echo json_encode(["status" => "error", "message" => $msg, "details" => $details]);
    exit;
}

function sendSuccess($data = []) {
    if (is_array($data) && !isset($data['status'])) {
        echo json_encode(array_merge(["status" => "success"], $data));
    } else {
        echo json_encode($data);
    }
    exit;
}

if(!$conn) sendError("DATABASE_OFFLINE", 500);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $group = $_GET['group'] ?? 'USERS';
    if ($group === 'ADMINS') {
        $stmt = $conn->prepare("SELECT id, name, email, role, is_verified, created_at FROM users WHERE role LIKE 'ADMIN%'");
    } else {
        $stmt = $conn->prepare("SELECT id, name, email, role, is_verified, created_at FROM users WHERE role NOT LIKE 'ADMIN%'");
    }
    $stmt->execute();
    $rows = $stmt->fetchAll();
    
    // Explicitly map snake_case to camelCase for the frontend User interface
    foreach($rows as &$row) {
        $row['isVerified'] = $row['is_verified'] == 1;
        unset($row['is_verified']);
    }
    
    echo json_encode($rows);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = getJsonInput();
    if (!$input || !isset($input->id)) sendError("MISSING_ID");
    $stmt = $conn->prepare("UPDATE users SET is_verified = ? WHERE id = ?");
    $stmt->execute([$input->isVerified ? 1 : 0, $input->id]);
    sendSuccess();
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) sendError("MISSING_ID");
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ? AND role NOT LIKE 'ADMIN%'");
    $stmt->execute([$id]);
    sendSuccess();
}
