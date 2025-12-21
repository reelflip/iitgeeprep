<?php
/**
 * IITGEEPrep Unified Sync Engine v17.0
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

if(!$conn) sendError("DATABASE_OFFLINE", 500);
$input = getJsonInput();
if(!$input || !isset($input->userId)) sendError("MISSING_DATA");

try {
    $sql = "INSERT INTO user_progress (user_id, topic_id, status, last_revised, revision_level, next_revision_date, solved_questions_json) 
            VALUES (:uid, :tid, :status, :lr, :rl, :nrd, :sqj) 
            ON DUPLICATE KEY UPDATE 
            status = VALUES(status), 
            last_revised = VALUES(last_revised), 
            revision_level = VALUES(revision_level), 
            next_revision_date = VALUES(next_revision_date),
            solved_questions_json = VALUES(solved_questions_json)";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':uid' => $input->userId,
        ':tid' => $input->topicId,
        ':status' => $input->status,
        ':lr' => $input->lastRevised ?? null,
        ':rl' => $input->revisionLevel ?? 0,
        ':nrd' => $input->nextRevisionDate ?? null,
        ':sqj' => isset($input->solvedQuestions) ? json_encode($input->solvedQuestions) : null
    ]);

    sendSuccess();
} catch(Exception $e) { sendError($e->getMessage(), 500); }