<?php
/**
 * IITGEEPrep Engine v12.43 - Command Central Core
 * 100% Complete 38-File Backend Deployment
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

function getV($data, $p) {
    if (!$data) return null;
    if (isset($data->$p)) return $data->$p;
    $snake = strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $p));
    if (isset($data->$snake)) return $data->$snake;
    return null;
}

$d = getJsonInput();
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = getV($d, 'id') ?? 'topic_' . mt_rand(1000,9999);
    $s = $conn->prepare("INSERT INTO topics (id, name, chapter, subject) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE name=VALUES(name), chapter=VALUES(chapter), subject=VALUES(subject)");
    $s->execute([$id, getV($d, 'name'), getV($d, 'chapter'), getV($d, 'subject')]);
    echo json_encode(["status" => "success", "id" => $id]);
} else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $conn->prepare("DELETE FROM topics WHERE id = ?")->execute([$_GET['id']]);
    echo json_encode(["status" => "success"]);
}
?>