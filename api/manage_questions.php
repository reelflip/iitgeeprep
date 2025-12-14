<?php
error_reporting(0); // Suppress warnings to ensure clean JSON
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
    $stmt = $conn->query("SELECT * FROM questions");
    $qs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // decode options
    foreach($qs as &$q) { $q['options'] = json_decode($q['options_json']); }
    echo json_encode($qs);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $stmt = $conn->prepare("INSERT INTO questions (id, subject_id, topic_id, text, options_json, correct_idx, difficulty, source, year) VALUES (?,?,?,?,?,?,?,?,?)");
    $stmt->execute([$data->id, $data->subjectId, $data->topicId, $data->text, json_encode($data->options), $data->correctOptionIndex, $data->difficulty, $data->source, $data->year]);
    echo json_encode(["status" => "success"]);
} elseif ($method === 'DELETE') {
    $conn->prepare("DELETE FROM questions WHERE id = ?")->execute([$_GET['id']]);
}
?>