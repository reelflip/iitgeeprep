<?php
/**
 * IITGEEPrep Engine v12.38 - Master Sync Core
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
    $s = $conn->prepare("INSERT INTO questions (id, subject_id, topic_id, text, options_json, correct_idx, source, year, difficulty) VALUES (?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE text=VALUES(text), options_json=VALUES(options_json)");
    $s->execute([getV($d, 'id'), getV($d, 'subjectId'), getV($d, 'topicId'), getV($d, 'text'), json_encode(getV($d, 'options')), getV($d, 'correctOptionIndex'), getV($d, 'source'), getV($d, 'year'), getV($d, 'difficulty')]);
    echo json_encode(["status" => "success"]);
} else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $conn->prepare("DELETE FROM questions WHERE id = ?")->execute([$_GET['id']]);
    echo json_encode(["status" => "success"]);
}
?>