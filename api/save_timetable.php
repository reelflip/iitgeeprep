<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

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
if(isset($data->user_id)) {
    try {
        $config = json_encode($data->config);
        $slots = json_encode($data->slots);
        
        $sql = "INSERT INTO timetable (user_id, config_json, slots_json, updated_at) 
                VALUES (?, ?, ?, NOW()) 
                ON DUPLICATE KEY UPDATE config_json = VALUES(config_json), slots_json = VALUES(slots_json), updated_at = NOW()";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data->user_id, $config, $slots]);
        
        echo json_encode(["message" => "Saved"]);
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Missing User ID"]);
}
?>