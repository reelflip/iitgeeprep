<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$data = json_decode(file_get_contents('php://input'));
if(!empty($data->user_id)) {
    try {
        $config_json = isset($data->config) ? json_encode($data->config) : null;
        $slots_json = isset($data->slots) ? json_encode($data->slots) : null;
        $stmt = $conn->prepare("INSERT INTO timetable (user_id, config_json, slots_json) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE config_json = IFNULL(?, config_json), slots_json = IFNULL(?, slots_json)");
        $stmt->execute([$data->user_id, $config_json, $slots_json, $config_json, $slots_json]);
        echo json_encode(["status" => "success"]);
    } catch(Exception $e) { http_response_code(500); echo json_encode(["error" => $e->getMessage()]); }
}
?>