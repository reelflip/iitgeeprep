<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$data = json_decode(file_get_contents('php://input'));
if(!empty($data->from_id) && !empty($data->to_id)) {
    try {
        $id = 'notif_'.time();
        $stmt = $conn->prepare("INSERT INTO notifications (id, from_id, from_name, to_id, type, message) VALUES (?, ?, ?, ?, 'connection_request', ?)");
        $stmt->execute([$id, $data->from_id, $data->from_name, $data->to_id, "Wants to connect with you as a Parent."]);
        echo json_encode(["success" => true, "message" => "Request sent!"]);
    } catch(Exception $e) { echo json_encode(["success" => false, "message" => "Request failed."]); }
}
?>