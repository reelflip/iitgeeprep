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
if(!empty($data->user_id) && !empty($data->topic_id)) {
    $check = $conn->prepare("SELECT id FROM topic_progress WHERE user_id = ? AND topic_id = ?");
    $check->execute([$data->user_id, $data->topic_id]);
    
    if($check->rowCount() > 0) {
        $query = "UPDATE topic_progress SET status = :status, last_revised = :lr, revision_level = :rl, next_revision_date = :nrd, ex1_solved = :e1s, ex1_total = :e1t, ex2_solved = :e2s, ex2_total = :e2t WHERE user_id = :uid AND topic_id = :tid";
    } else {
        $query = "INSERT INTO topic_progress (user_id, topic_id, status, last_revised, revision_level, next_revision_date, ex1_solved, ex1_total, ex2_solved, ex2_total) VALUES (:uid, :tid, :status, :lr, :rl, :nrd, :e1s, :e1t, :e2s, :e2t)";
    }
    $stmt = $conn->prepare($query);
    $stmt->execute([
        ':uid' => $data->user_id,
        ':tid' => $data->topic_id,
        ':status' => $data->status ?? 'PENDING',
        ':lr' => $data->lastRevised ?? date('Y-m-d H:i:s'),
        ':rl' => $data->revisionLevel ?? 0,
        ':nrd' => $data->nextRevisionDate ?? null,
        ':e1s' => $data->ex1Solved ?? 0,
        ':e1t' => $data->ex1Total ?? 30,
        ':e2s' => $data->ex2Solved ?? 0,
        ':e2t' => $data->ex2Total ?? 20
    ]);
    echo json_encode(["message" => "Saved"]);
}
?>