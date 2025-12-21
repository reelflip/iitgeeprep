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
$user_id = $_GET['user_id'] ?? null;
if(!$user_id) sendError("MISSING_USER_ID");

try {
    // 1. Progress
    $stmt = $conn->prepare("SELECT * FROM user_progress WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $progress = [];
    foreach($stmt->fetchAll() as $row) {
        $progress[] = [
            "topicId" => $row['topic_id'],
            "status" => $row['status'],
            "lastRevised" => $row['last_revised'],
            "revisionLevel" => (int)$row['revision_level'],
            "nextRevisionDate" => $row['next_revision_date'],
            "solvedQuestions" => $row['solved_questions_json'] ? json_decode($row['solved_questions_json']) : []
        ];
    }

    // 2. Attempts
    $stmt = $conn->prepare("SELECT * FROM test_attempts WHERE user_id = ? ORDER BY date DESC");
    $stmt->execute([$user_id]);
    $attempts = [];
    foreach($stmt->fetchAll() as $row) {
        $attempts[] = [
            "id" => $row['id'],
            "date" => $row['date'],
            "title" => $row['title'],
            "score" => (int)$row['score'],
            "totalMarks" => (int)$row['total_marks'],
            "accuracy" => (int)$row['accuracy'],
            "accuracy_percent" => (int)$row['accuracy'],
            "testId" => $row['test_id'],
            "totalQuestions" => (int)$row['total_questions'],
            "correctCount" => (int)$row['correct_count'],
            "incorrectCount" => (int)$row['incorrect_count'],
            "unattemptedCount" => (int)$row['unattempted_count'],
            "topicId" => $row['topic_id'],
            "difficulty" => $row['difficulty'],
            "detailedResults" => $row['detailed_results'] ? json_decode($row['detailed_results']) : []
        ];
    }

    // 3. Goals
    $stmt = $conn->prepare("SELECT id, text, completed FROM goals WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $goals = [];
    foreach($stmt->fetchAll() as $row) {
        $goals[] = ["id" => $row['id'], "text" => $row['text'], "completed" => (bool)$row['completed']];
    }

    // 4. Backlogs
    $stmt = $conn->prepare("SELECT id, topic, subject, priority, deadline, status FROM backlogs WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $backlogs = [];
    foreach($stmt->fetchAll() as $row) {
        $backlogs[] = [
            "id" => $row['id'],
            "topic" => $row['topic'],
            "subject" => $row['subject'],
            "priority" => $row['priority'],
            "deadline" => $row['deadline'],
            "status" => $row['status']
        ];
    }

    // 5. Timetable
    $stmt = $conn->prepare("SELECT config_json, slots_json FROM timetables WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $timetableRow = $stmt->fetch();

    // 6. Psychometric
    $stmt = $conn->prepare("SELECT report_json FROM psychometric_reports WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $psychRow = $stmt->fetch();

    sendSuccess([
        "progress" => $progress,
        "attempts" => $attempts,
        "goals" => $goals,
        "backlogs" => $backlogs,
        "timetable" => $timetableRow ? [
            "config" => json_decode($timetableRow['config_json']),
            "slots" => json_decode($timetableRow['slots_json'])
        ] : null,
        "psychometric" => $psychRow ? json_decode($psychRow['report_json']) : null
    ]);
} catch(Exception $e) { sendError($e->getMessage(), 500); }