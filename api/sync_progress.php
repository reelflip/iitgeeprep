<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$data = json_decode(file_get_contents('php://input'));
if(!empty($data->user_id) && !empty($data->topicId)) {
    try {
        $stmt = $conn->prepare("INSERT INTO user_progress (user_id, topic_id, status, last_revised, revision_level, next_revision_date, solved_questions_json) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE status = VALUES(status), last_revised = VALUES(last_revised), revision_level = VALUES(revision_level), next_revision_date = VALUES(next_revision_date), solved_questions_json = VALUES(solved_questions_json)");
        $stmt->execute([$data->user_id, $data->topicId, $data->status, $data->lastRevised, $data->revisionLevel, $data->nextRevisionDate, json_encode($data->solvedQuestions)]);
        echo json_encode(["status" => "success"]);
    } catch(Exception $e) { http_response_code(500); echo json_encode(["error" => $e->getMessage()]); }
}
?>