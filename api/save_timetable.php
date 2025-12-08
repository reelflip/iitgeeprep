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
$uid = $data->user_id;
$config = json_encode($data->config);
$slots = json_encode($data->slots);

$check = $conn->prepare("SELECT user_id FROM timetable_configs WHERE user_id = ?");
$check->execute([$uid]);

if($check->rowCount() > 0) {
    $stmt = $conn->prepare("UPDATE timetable_configs SET config_json = ?, slots_json = ? WHERE user_id = ?");
    $stmt->execute([$config, $slots, $uid]);
} else {
    $stmt = $conn->prepare("INSERT INTO timetable_configs (user_id, config_json, slots_json) VALUES (?, ?, ?)");
    $stmt->execute([$uid, $config, $slots]);
}
echo json_encode(["message" => "Saved"]);
?>