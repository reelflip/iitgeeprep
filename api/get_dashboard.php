<?php
/**
 * IITGEEPrep Pro Engine v12.35 - Persistence Core
 * Full Production Backend Suite - Zero Partial Updates
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
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(["error" => "INVALID_JSON", "details" => json_last_error_msg()]);
        exit;
    }
    return $data;
}

function requireProps($data, $props) {
    if (!$data) {
        http_response_code(400);
        echo json_encode(["error" => "MISSING_BODY"]);
        exit;
    }
    foreach ($props as $p) {
        if (!isset($data->$p)) {
            http_response_code(400);
            echo json_encode(["error" => "MISSING_PROPERTY", "property" => $p]);
            exit;
        }
    }
}

if(!isset($_GET['user_id'])) { echo json_encode(["error" => "MISSING_USER_ID"]); exit; }
$user_id = $_GET['user_id'];
$resp = [];
$stmt = $conn->prepare("SELECT * FROM users WHERE id = ?"); $stmt->execute([$user_id]);
$resp['userProfileSync'] = $stmt->fetch();
$stmt = $conn->prepare("SELECT * FROM user_progress WHERE user_id = ?"); $stmt->execute([$user_id]);
$resp['progress'] = $stmt->fetchAll();
$stmt = $conn->prepare("SELECT * FROM test_attempts WHERE user_id = ? ORDER BY date DESC"); $stmt->execute([$user_id]);
$resp['attempts'] = $stmt->fetchAll();
$stmt = $conn->prepare("SELECT * FROM goals WHERE user_id = ?"); $stmt->execute([$user_id]);
$resp['goals'] = $stmt->fetchAll();
$stmt = $conn->prepare("SELECT * FROM backlogs WHERE user_id = ?"); $stmt->execute([$user_id]);
$resp['backlogs'] = $stmt->fetchAll();
$stmt = $conn->prepare("SELECT * FROM notifications WHERE to_id = ? ORDER BY date DESC"); $stmt->execute([$user_id]);
$resp['notifications'] = $stmt->fetchAll();
$stmt = $conn->prepare("SELECT * FROM timetable WHERE user_id = ?"); $stmt->execute([$user_id]);
$resp['timetable'] = $stmt->fetch();
$resp['api_version'] = "12.35";
echo json_encode($resp);
?>