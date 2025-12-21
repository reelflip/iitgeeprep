<?php
/**
 * IITGEEPrep Engine v13.5 - Production Logic Core
 * REAL DATABASE OPERATIONS ONLY - NO MOCKING
 */
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

include_once 'cors.php';
include_once 'config.php';

function getJsonInput() {
    $raw = file_get_contents('php://input');
    if (!$raw || $raw === '{}' || $raw === '[]') return null;
    $data = json_decode($raw);
    return (json_last_error() === JSON_ERROR_NONE) ? $data : null;
}

function getV($data, $p, $default = null) {
    if (!$data) return $default;
    if (isset($data->$p)) return $data->$p;
    $snake = strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $p));
    if (isset($data->$snake)) return $data->$snake;
    return $default;
}

function sendError($msg, $code = 400) {
    http_response_code($code);
    echo json_encode(["status" => "error", "message" => $msg]);
    exit;
}

function sendSuccess($data = []) {
    echo json_encode(array_merge(["status" => "success"], $data));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    if ($raw === '{}' || $raw === '[]') {
        echo json_encode(["status" => "active", "message" => "Endpoint responsive"]);
        exit;
    }
}

$data = getJsonInput();
if (!$data) sendError("Payload missing");
try {
    $stmt = $conn->prepare("INSERT INTO test_attempts (id, user_id, test_id, title, score, total_marks, accuracy, total_questions, correct_count, incorrect_count, unattempted_count, topic_id, difficulty, detailed_results) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        getV($data, 'id'), getV($data, 'userId'), getV($data, 'testId'), getV($data, 'title'),
        getV($data, 'score'), getV($data, 'totalMarks'), getV($data, 'accuracy'),
        getV($data, 'totalQuestions'), getV($data, 'correctCount'), getV($data, 'incorrectCount'),
        getV($data, 'unattemptedCount'), getV($data, 'topicId'), getV($data, 'difficulty'),
        json_encode(getV($data, 'detailedResults', []))
    ]);
    sendSuccess(["attempt_id" => getV($data, 'id')]);
} catch (Exception $e) { sendError($e->getMessage(), 500); }