<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

$data = json_decode(file_get_contents("php://input"));
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST') {
    $stmt = $conn->prepare("INSERT INTO mistakes (id, user_id, question_text, user_notes, subject_id, tags) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$data->id, $data->user_id, $data->questionText, $data->userNotes, $data->subjectId, json_encode($data->tags)]);
} 
elseif ($method === 'PUT') {
    $stmt = $conn->prepare("UPDATE mistakes SET user_notes = ?, tags = ? WHERE id = ?");
    $stmt->execute([$data->userNotes, json_encode($data->tags), $data->id]);
}
elseif ($method === 'DELETE') {
    $conn->prepare("DELETE FROM mistakes WHERE id = ?")->execute([$_GET['id']]);
}
echo json_encode(["message" => "OK"]);
?>