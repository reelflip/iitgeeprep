<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$data = json_decode(file_get_contents("php://input"));
if(isset($data->user_id) && isset($data->testId)) {
    try {
        // Strict JSON encoding for LONGTEXT column
        $details = isset($data->detailedResults) ? json_encode($data->detailedResults) : '[]';
        
        $stmt = $conn->prepare("INSERT INTO test_attempts (id, user_id, test_id, score, total_marks, accuracy, detailed_results, topic_id, difficulty, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
        $stmt->execute([
            $data->id, 
            $data->user_id, 
            $data->testId, 
            $data->score, 
            $data->totalMarks, 
            $data->accuracy_percent, 
            $details,
            $data->topicId ?? null,
            $data->difficulty ?? 'MIXED'
        ]);
        echo json_encode(["message" => "Saved"]);
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Missing User ID or Test ID"]);
}
?>