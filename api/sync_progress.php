<?php
error_reporting(0); // Suppress warnings to ensure clean JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'config.php';

$data = json_decode(file_get_contents("php://input"));
if($data && isset($data->user_id) && isset($data->topic_id)) {
    // Check exists
    $check = $conn->prepare("SELECT id FROM user_progress WHERE user_id=? AND topic_id=?");
    $check->execute([$data->user_id, $data->topic_id]);
    
    if($check->rowCount() > 0) {
        $sql = "UPDATE user_progress SET status=?, last_revised=?, revision_level=?, next_revision_date=?, solved_questions_json=? WHERE user_id=? AND topic_id=?";
        $conn->prepare($sql)->execute([
            $data->status, $data->lastRevised, $data->revisionLevel, $data->nextRevisionDate, json_encode($data->solvedQuestions),
            $data->user_id, $data->topic_id
        ]);
    } else {
        $sql = "INSERT INTO user_progress (user_id, topic_id, status, last_revised, revision_level, next_revision_date, solved_questions_json) VALUES (?,?,?,?,?,?,?)";
        $conn->prepare($sql)->execute([
            $data->user_id, $data->topic_id, $data->status, $data->lastRevised, $data->revisionLevel, $data->nextRevisionDate, json_encode($data->solvedQuestions)
        ]);
    }
    echo json_encode(["message" => "Synced"]);
} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid data"]);
}
?>