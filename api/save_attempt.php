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
$stmt = $conn->prepare("INSERT INTO test_attempts (id, user_id, test_id, score, total_marks, accuracy, correct_count, incorrect_count, unattempted_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
$id = uniqid('att_');
$stmt->execute([
    $id, $data->user_id, $data->testId, $data->score, $data->totalQuestions*4, $data->accuracy_percent, 
    $data->correctCount, $data->incorrectCount, $data->unattemptedCount
]);
if(!empty($data->detailedResults)) {
    $dStmt = $conn->prepare("INSERT INTO attempt_details (attempt_id, question_id, status, selected_option) VALUES (?, ?, ?, ?)");
    foreach($data->detailedResults as $res) {
        $dStmt->execute([$id, $res->questionId, $res->status, $res->selectedOptionIndex]);
    }
}
echo json_encode(["message" => "Saved", "id" => $id]);
?>