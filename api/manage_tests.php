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

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($conn->query("SELECT * FROM tests")->fetchAll());
} else if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $d = getJsonInput();
    $s = $conn->prepare("INSERT INTO tests (id, title, duration, questions_json, category, difficulty, exam_type) VALUES (?,?,?,?,?,?,?)");
    $s->execute([getV($d, 'id'), getV($d, 'title'), getV($d, 'durationMinutes') ?? getV($d, 'duration'), json_encode(getV($d, 'questions')), getV($d, 'category'), getV($d, 'difficulty'), getV($d, 'examType')]);
    echo json_encode(["status" => "success"]);
} else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $conn->prepare("DELETE FROM tests WHERE id = ?")->execute([$_GET['id']]);
    echo json_encode(["status" => "success"]);
}
?>