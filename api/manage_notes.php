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
if ($method === 'GET') {
    $row = $conn->prepare("SELECT pages_json FROM chapter_notes WHERE topic_id = ?");
    $row->execute([$_GET['topic_id']]);
    echo json_encode(["pages" => json_decode($row->fetchColumn())]);
} else if ($method === 'POST') {
    $stmt = $conn->prepare("INSERT INTO chapter_notes (topic_id, pages_json) VALUES (?, ?) ON DUPLICATE KEY UPDATE pages_json = VALUES(pages_json)");
    $stmt->execute([getV($data, 'topicId'), json_encode(getV($data, 'pages'))]);
    echo json_encode(["status" => "success"]);
}