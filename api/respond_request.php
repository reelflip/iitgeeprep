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
$notId = getV($data, 'notificationId');
$action = getV($data, 'action');
if ($action === 'ACCEPT') {
    $not = $conn->query("SELECT from_id, to_id FROM notifications WHERE id='$notId'")->fetch();
    $conn->prepare("UPDATE users SET parent_id=? WHERE id=?")->execute([$not['from_id'], $not['to_id']]);
    $conn->prepare("UPDATE users SET linked_student_id=? WHERE id=?")->execute([$not['to_id'], $not['from_id']]);
}
$conn->prepare("DELETE FROM notifications WHERE id=?")->execute([$notId]);
echo json_encode(["status" => "success"]);