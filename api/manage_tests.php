<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'GET') {
    $stmt = $conn->query("SELECT * FROM tests");
    $tests = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach($tests as &$t) { $t['questions'] = json_decode($t['questions_json']); }
    echo json_encode($tests);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    // Uses LONGTEXT in schema
    $stmt = $conn->prepare("INSERT INTO tests (id, title, duration, category, difficulty, exam_type, questions_json) VALUES (?,?,?,?,?,?,?)");
    $stmt->execute([$data->id, $data->title, $data->durationMinutes, $data->category, $data->difficulty, $data->examType, json_encode($data->questions)]);
    echo json_encode(["status" => "success"]);
} elseif ($method === 'DELETE') {
    $conn->prepare("DELETE FROM tests WHERE id = ?")->execute([$_GET['id']]);
}
?>