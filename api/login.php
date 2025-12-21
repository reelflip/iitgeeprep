<?php
/**
 * IITGEEPrep Unified Sync Engine v20.0
 * PRODUCTION CORE - STRICT MYSQL PDO
 */
error_reporting(E_ALL);
ini_set('display_errors', 0);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

include_once 'config.php';

function getJsonInput() {
    return json_decode(file_get_contents('php://input'));
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

// logic for login.php
$input = getJsonInput();
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$input->email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
if($user && password_verify($input->password, $user['password_hash'])) {
    unset($user['password_hash']);
    sendSuccess(['user' => $user]);
} sendError("Invalid credentials", 401);