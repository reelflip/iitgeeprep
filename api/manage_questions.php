<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'GET') {
    $stmt = $conn->query("SELECT * FROM questions");
    $qs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach($qs as &$q) { $q['options'] = json_decode($q['options_json']); }
    echo json_encode($qs);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $stmt = $conn->prepare("INSERT INTO questions (id, subject_id, topic_id, text, options_json, correct_idx, difficulty, source, year) VALUES (?,?,?,?,?,?,?,?,?)");
    $stmt->execute([$data->id, $data->subjectId, $data->topicId, $data->text, json_encode($data->options), $data->correctOptionIndex, $data->difficulty, $data->source, $data->year]);
    echo json_encode(["status" => "success"]);
} elseif ($method === 'DELETE') {
    $conn->prepare("DELETE FROM questions WHERE id = ?")->execute([$_GET['id']]);
}
?>