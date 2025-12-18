<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$data = json_decode(file_get_contents('php://input'));
if(!empty($data->user_id) && !empty($data->report)) {
    try {
        $stmt = $conn->prepare("INSERT INTO psychometric_results (user_id, report_json) VALUES (?, ?) ON DUPLICATE KEY UPDATE report_json = VALUES(report_json)");
        $stmt->execute([$data->user_id, json_encode($data->report)]);
        echo json_encode(["status" => "success"]);
    } catch(Exception $e) { http_response_code(500); echo json_encode(["error" => $e->getMessage()]); }
}
?>