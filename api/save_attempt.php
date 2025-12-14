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

$data = json_decode(file_get_contents("php://input"));
if(isset($data->user_id)) {
    $stmt = $conn->prepare("INSERT INTO test_attempts (id, user_id, test_id, score, total_marks, accuracy, detailed_results, topic_id, difficulty) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $data->id, $data->user_id, $data->testId, $data->score, 
        $data->totalMarks, $data->accuracy_percent, 
        json_encode($data->detailedResults),
        $data->topicId ?? null,
        $data->difficulty ?? 'MIXED'
    ]);
    echo json_encode(["message" => "Saved"]);
} else {
    http_response_code(400);
    echo json_encode(["error" => "Missing User ID"]);
}
?>