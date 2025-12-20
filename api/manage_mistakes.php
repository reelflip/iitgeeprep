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
$data = getJsonInput();
if ($method === 'POST') {
    $id = 'err_' . uniqid();
    $conn->prepare("INSERT INTO mistake_logs (id, user_id, question, subject, note) VALUES (?, ?, ?, ?, ?)")->execute([$id, getV($data, 'userId'), getV($data, 'question'), getV($data, 'subject'), getV($data, 'note')]);
    echo json_encode(["status" => "success", "id" => $id]);
} else if ($method === 'GET') {
    echo json_encode($conn->query("SELECT * FROM mistake_logs WHERE user_id = '".$_GET['user_id']."'")->fetchAll());
}