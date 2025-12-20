<?php
/**
 * IITGEEPrep Pro Engine v12.35 - Persistence Core
 * Full Production Backend Suite - Zero Partial Updates
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

function requireProps($data, $props) {
    if (!$data) {
        http_response_code(400);
        echo json_encode(["error" => "MISSING_BODY"]);
        exit;
    }
    foreach ($props as $p) {
        if (!isset($data->$p)) {
            http_response_code(400);
            echo json_encode(["error" => "MISSING_PROPERTY", "property" => $p]);
            exit;
        }
    }
}

$d = getJsonInput();
requireProps($d, ['user_id', 'id', 'testId', 'score']);
$sql = "INSERT INTO test_attempts (id, user_id, test_id, title, score, total_marks, accuracy_percent, total_questions, correct_count, incorrect_count, unattempted_count, topic_id, detailed_results) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->execute([$d->id, $d->user_id, $d->testId, $d->title, $d->score, $d->totalMarks, $d->accuracy_percent, $d->totalQuestions, $d->correctCount, $d->incorrectCount, $d->unattemptedCount, $d->topicId ?? null, json_encode($d->detailedResults)]);
echo json_encode(["status" => "success", "version" => "12.35"]);
?>