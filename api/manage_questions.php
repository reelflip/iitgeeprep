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

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($conn->query("SELECT * FROM questions")->fetchAll());
} else if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $d = getJsonInput();
    $stmt = $conn->prepare("INSERT INTO questions (id, subject_id, topic_id, text, options_json, correct_index, source, year, difficulty) VALUES (?,?,?,?,?,?,?,?,?)");
    $stmt->execute([$d->id, $d->subjectId, $d->topicId, $d->text, json_encode($d->options), $d->correctOptionIndex, $d->source, $d->year, $d->difficulty]);
    echo json_encode(["status" => "success"]);
}
?>