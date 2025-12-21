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
    echo json_encode(array_merge(["status" => "success"], $data));
    exit;
}

if(!$conn) sendError("DATABASE_OFFLINE", 500);
$user_id = $_GET['user_id'] ?? null;
if(!$user_id) sendError("MISSING_USER_ID");

try {
    // 1. Progress
    $stmt = $conn->prepare("SELECT * FROM user_progress WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $progress = $stmt->fetchAll();

    // 2. Test Attempts
    $stmt = $conn->prepare("SELECT * FROM test_attempts WHERE user_id = ? ORDER BY date DESC LIMIT 20");
    $stmt->execute([$user_id]);
    $attempts = $stmt->fetchAll();

    // 3. Goals
    $stmt = $conn->prepare("SELECT * FROM goals WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $goals = $stmt->fetchAll();

    // 4. Backlogs
    $stmt = $conn->prepare("SELECT * FROM backlogs WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $backlogs = $stmt->fetchAll();

    sendSuccess([
        "progress" => $progress,
        "attempts" => $attempts,
        "goals" => $goals,
        "backlogs" => $backlogs
    ]);
} catch(Exception $e) { sendError($e->getMessage(), 500); }