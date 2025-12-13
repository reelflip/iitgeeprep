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
if($data->user_id && $data->report) {
    $json = json_encode($data->report);
    $stmt = $conn->prepare("INSERT INTO psychometric_results (user_id, report_json) VALUES (?, ?)");
    $stmt->execute([$data->user_id, $json]);
    echo json_encode(["message" => "Saved"]);
}
?>