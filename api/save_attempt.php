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

$d = getJsonInput();
$sql = "INSERT INTO test_attempts (id, user_id, test_id, title, score, total_marks, accuracy, total_questions, correct_count, incorrect_count, unattempted_count, topic_id, difficulty, detailed_results) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$s = $conn->prepare($sql);
$s->execute([getV($d, 'id'), getV($d, 'userId'), getV($d, 'testId'), getV($d, 'title'), getV($d, 'score'), getV($d, 'totalMarks'), getV($d, 'accuracy_percent') ?? getV($d, 'accuracy'), getV($d, 'totalQuestions'), getV($d, 'correctCount'), getV($d, 'incorrectCount'), getV($d, 'unattemptedCount'), getV($d, 'topicId'), getV($d, 'difficulty'), json_encode(getV($d, 'detailedResults') ?? [])]);
echo json_encode(["status" => "success"]);
?>