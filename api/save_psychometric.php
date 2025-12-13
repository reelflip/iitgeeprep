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
if (!empty($data->user_id) && !empty($data->report)) {
    $stmt = $conn->prepare("INSERT INTO psychometric_results (id, user_id, report_json) VALUES (?, ?, ?)");
    $id = uniqid('psy_');
    $stmt->execute([$id, $data->user_id, json_encode($data->report)]);
    echo json_encode(["message" => "Saved", "id" => $id]);
} else {
    http_response_code(400);
    echo json_encode(["error" => "Incomplete data"]);
}
?>