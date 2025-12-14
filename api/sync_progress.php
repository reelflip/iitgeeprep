<?php
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
if(!empty($data->user_id) && !empty($data->topic_id)) {
    $check = $conn->prepare("SELECT id FROM topic_progress WHERE user_id = ? AND topic_id = ?");
    $check->execute([$data->user_id, $data->topic_id]);
    
    // Convert solvedQuestions array to JSON for storage if present
    $solvedJson = isset($data->solvedQuestions) ? json_encode($data->solvedQuestions) : '[]';

    if($check->rowCount() > 0) {
        $query = "UPDATE topic_progress SET status = :status, last_revised = :lr, revision_level = :rl, next_revision_date = :nrd, solved_questions_json = :sqj WHERE user_id = :uid AND topic_id = :tid";
    } else {
        $query = "INSERT INTO topic_progress (user_id, topic_id, status, last_revised, revision_level, next_revision_date, solved_questions_json) VALUES (:uid, :tid, :status, :lr, :rl, :nrd, :sqj)";
    }
    $stmt = $conn->prepare($query);
    $stmt->execute([
        ':uid' => $data->user_id,
        ':tid' => $data->topic_id,
        ':status' => $data->status ?? 'PENDING',
        ':lr' => $data->lastRevised ?? date('Y-m-d H:i:s'),
        ':rl' => $data->revisionLevel ?? 0,
        ':nrd' => $data->nextRevisionDate ?? null,
        ':sqj' => $solvedJson
    ]);
    echo json_encode(["message" => "Saved"]);
}
?>