<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

$data = json_decode(file_get_contents("php://input"));
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $conn->prepare("SELECT * FROM tests");
    $stmt->execute();
    $tests = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Hydrate questions
    foreach($tests as &$test) {
        $qStmt = $conn->prepare("SELECT * FROM questions WHERE test_id = ?");
        $qStmt->execute([$test['id']]);
        $questions = $qStmt->fetchAll(PDO::FETCH_ASSOC);
        foreach($questions as &$q) {
            $q['options'] = json_decode($q['options_json']);
            unset($q['options_json']);
        }
        $test['questions'] = $questions;
    }
    echo json_encode($tests);
} 
elseif ($method === 'POST') {
    // Create Test
    $test = $data;
    $stmt = $conn->prepare("INSERT INTO tests (id, title, duration_minutes, difficulty, exam_type) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$test->id, $test->title, $test->durationMinutes, $test->difficulty, $test->examType]);
    
    // Add Questions
    foreach($test->questions as $q) {
        $qStmt = $conn->prepare("INSERT INTO questions (id, test_id, subject_id, topic_id, text, options_json, correct_option, source_tag, year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $qStmt->execute([
            $q->id, $test->id, $q->subjectId, $q->topicId, $q->text, json_encode($q->options), $q->correctOptionIndex, $q->source, $q->year
        ]);
    }
    echo json_encode(["message" => "Test Created"]);
}
?>