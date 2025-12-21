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
$input = getJsonInput();
if(!$input || !isset($input->userId)) sendError("MISSING_DATA");

try {
    $sql = "INSERT INTO timetables (user_id, config_json, slots_json) 
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE 
            config_json = VALUES(config_json), 
            slots_json = VALUES(slots_json)";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        $input->userId,
        json_encode($input->config),
        json_encode($input->slots)
    ]);

    sendSuccess();
} catch(Exception $e) { sendError($e->getMessage(), 500); }