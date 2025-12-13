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
if($data->user_id) {
    $config = json_encode($data->config);
    $slots = json_encode($data->slots);
    $stmt = $conn->prepare("INSERT INTO timetable_configs (user_id, config_json, slots_json) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE config_json = ?, slots_json = ?");
    $stmt->execute([$data->user_id, $config, $slots, $config, $slots]);
    echo json_encode(["message" => "Saved"]);
}
?>