<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$data = json_decode(file_get_contents('php://input'));
if(!empty($data->user_id)) {
    try {
        $id = 'att_'.time().'_'.mt_rand(10,99);
        $sql = "INSERT INTO test_attempts (id, user_id, test_id, score, total_marks, accuracy, detailed_results, topic_id, difficulty, total_questions, correct_count, incorrect_count, unattempted_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$id, $data->user_id, $data->testId, $data->score, $data->totalMarks, $data->accuracy, json_encode($data->detailedResults), $data->topicId, $data->difficulty, $data->totalQuestions, $data->correctCount, $data->incorrectCount, $data->unattemptedCount]);
        echo json_encode(["status" => "success", "id" => $id]);
    } catch(Exception $e) { http_response_code(500); echo json_encode(["error" => $e->getMessage()]); }
}
?>