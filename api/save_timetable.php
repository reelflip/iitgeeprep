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
    $check = $conn->prepare("SELECT id FROM timetable WHERE user_id = ?");
    $check->execute([$data->user_id]);
    
    $config = json_encode($data->config);
    $slots = json_encode($data->slots);
    
    if($check->rowCount() > 0) {
        $conn->prepare("UPDATE timetable SET config_json=?, slots_json=? WHERE user_id=?")->execute([$config, $slots, $data->user_id]);
    } else {
        $conn->prepare("INSERT INTO timetable (user_id, config_json, slots_json) VALUES (?,?,?)")->execute([$data->user_id, $config, $slots]);
    }
    echo json_encode(["message" => "Saved"]);
}
?>