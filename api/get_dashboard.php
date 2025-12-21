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

// logic for get_dashboard.php
$user_id = $_GET['user_id'] ?? null;
if(!$user_id) sendError("MISSING_USER_ID");
try {
    $data = [
        'progress' => [], 'attempts' => [], 'goals' => [], 'backlogs' => [], 
        'timetable' => null, 'psychometric' => null
    ];
    $stmt = $conn->prepare("SELECT * FROM user_progress WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $data['progress'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt = $conn->prepare("SELECT * FROM test_attempts WHERE user_id = ? ORDER BY date DESC");
    $stmt->execute([$user_id]);
    $data['attempts'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt = $conn->prepare("SELECT * FROM goals WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $data['goals'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt = $conn->prepare("SELECT * FROM backlogs WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $data['backlogs'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt = $conn->prepare("SELECT * FROM timetables WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $tt = $stmt->fetch(PDO::FETCH_ASSOC);
    if($tt) $data['timetable'] = ["config" => json_decode($tt['config_json']), "slots" => json_decode($tt['slots_json'])];
    $stmt = $conn->prepare("SELECT report_json FROM psychometric_reports WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $psych = $stmt->fetch(PDO::FETCH_ASSOC);
    if($psych) $data['psychometric'] = json_decode($psych['report_json']);
    sendSuccess($data);
} catch(Exception $e) { sendError($e->getMessage()); }