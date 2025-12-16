<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';
 $data = json_decode(file_get_contents("php://input")); if($data && isset($data->user_id) && isset($data->topic_id)) { try { $solvedJson = isset($data->solvedQuestions) ? json_encode($data->solvedQuestions) : '[]'; $sql = "INSERT INTO user_progress (user_id, topic_id, status, last_revised, revision_level, next_revision_date, solved_questions_json) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE status = VALUES(status), last_revised = VALUES(last_revised), revision_level = VALUES(revision_level), next_revision_date = VALUES(next_revision_date), solved_questions_json = VALUES(solved_questions_json)"; $stmt = $conn->prepare($sql); $stmt->execute([$data->user_id, $data->topic_id, $data->status, $data->lastRevised, $data->revisionLevel, $data->nextRevisionDate, $solvedJson]); echo json_encode(["message" => "Synced Successfully"]); } catch (PDOException $e) { http_response_code(500); echo json_encode(["error" => "Database Error: " . $e->getMessage()]); } } else { http_response_code(400); echo json_encode(["error" => "Invalid Data Payload"]); } ?>