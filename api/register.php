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
$input = getJsonInput();
if(!$input || !isset($input->email) || !isset($input->password)) sendError("MISSING_CREDENTIALS");

try {
    // Check for existing
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$input->email]);
    if($stmt->fetch()) sendError("EMAIL_ALREADY_EXISTS");

    $id = bin2hex(random_bytes(4)); // Short 8-char ID
    $hash = password_hash($input->password, PASSWORD_DEFAULT);
    
    $sql = "INSERT INTO users (id, name, email, password_hash, role, institute, target_exam, target_year, dob, gender) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        $id,
        $input->name ?? 'Student',
        $input->email,
        $hash,
        $input->role ?? 'STUDENT',
        $input->institute ?? null,
        $input->targetExam ?? null,
        $input->targetYear ?? null,
        $input->dob ?? null,
        $input->gender ?? null
    ]);

    sendSuccess(["id" => $id]);
} catch(Exception $e) { sendError($e->getMessage(), 500); }