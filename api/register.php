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

$data = getJsonInput();
$id = 'std_' . uniqid();
$hash = password_hash(getV($data, 'password'), PASSWORD_BCRYPT);
$stmt = $conn->prepare("INSERT INTO users (id, name, email, password_hash, role, institute, target_exam, target_year, dob, gender, security_question, security_answer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
try {
    $stmt->execute([$id, getV($data, 'name'), getV($data, 'email'), $hash, getV($data, 'role'), getV($data, 'institute'), getV($data, 'targetExam'), getV($data, 'targetYear'), getV($data, 'dob'), getV($data, 'gender'), getV($data, 'securityQuestion'), getV($data, 'securityAnswer')]);
    echo json_encode(["status" => "success", "user_id" => $id]);
} catch(Exception $e) { http_response_code(400); echo json_encode(["status" => "error", "message" => $e->getMessage()]); }