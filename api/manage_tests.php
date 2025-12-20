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
if ($method === 'GET') {
    $tests = $conn->query("SELECT * FROM tests")->fetchAll();
    foreach($tests as &$t) { $t['questions'] = json_decode($t['questions_json']); }
    echo json_encode($tests);
} else if ($method === 'POST') {
    $data = getJsonInput();
    $stmt = $conn->prepare("INSERT INTO tests (id, title, duration, questions_json, category, difficulty) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=VALUES(title), duration=VALUES(duration), questions_json=VALUES(questions_json)");
    $stmt->execute([getV($data, 'id'), getV($data, 'title'), getV($data, 'durationMinutes'), json_encode(getV($data, 'questions')), getV($data, 'category'), getV($data, 'difficulty')]);
    echo json_encode(["status" => "success"]);
} else if ($method === 'DELETE') {
    $conn->prepare("DELETE FROM tests WHERE id = ?")->execute([$_GET['id']]);
    echo json_encode(["status" => "success"]);
}