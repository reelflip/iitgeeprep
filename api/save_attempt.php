<?php
/**
 * IITGEEPrep Unified Sync Engine v17.3
 * PRODUCTION CORE - STRICT MYSQL PDO
 */
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once 'config.php';

function getJsonInput() {
    $raw = file_get_contents('php://input');
    if (!$raw) return null;
    $data = json_decode($raw);
    return (json_last_error() === JSON_ERROR_NONE) ? $data : null;
}

function sendError($msg, $code = 400, $details = null) {
    http_response_code($code);
    echo json_encode(["status" => "error", "message" => $msg, "details" => $details]);
    exit;
}

function sendSuccess($data = []) {
    if (is_array($data) && !isset($data['status'])) {
        echo json_encode(array_merge(["status" => "success"], $data));
    } else {
        echo json_encode($data);
    }
    exit;
}

if(!$conn) sendError("DATABASE_OFFLINE", 500, $db_error);
$input = getJsonInput();
if(!$input || !isset($input->userId)) sendError("MISSING_DATA");

try {
    $sql = "INSERT INTO `test_attempts` (
        id, user_id, test_id, title, score, total_marks, accuracy, 
        total_questions, correct_count, incorrect_count, unattempted_count, 
        topic_id, difficulty, detailed_results, date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
        score = VALUES(score), 
        accuracy = VALUES(accuracy),
        correct_count = VALUES(correct_count),
        incorrect_count = VALUES(incorrect_count),
        unattempted_count = VALUES(unattempted_count),
        detailed_results = VALUES(detailed_results)";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        $input->id,
        $input->userId,
        $input->testId,
        $input->title,
        $input->score,
        $input->totalMarks,
        $input->accuracy_percent ?? ($input->accuracy ?? 0),
        $input->totalQuestions,
        $input->correctCount,
        $input->incorrectCount,
        $input->unattemptedCount,
        $input->topicId ?? null,
        $input->difficulty ?? null,
        isset($input->detailedResults) ? json_encode($input->detailedResults) : null,
        $input->date ?? date('Y-m-d H:i:s')
    ]);

    sendSuccess(["status" => "SAVED"]);
} catch(Exception $e) { sendError("PERSISTENCE_FAILURE", 500, $e->getMessage()); }