<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';
 $data = json_decode(file_get_contents("php://input")); if($data->user_id && $data->new_password) { $stmt = $conn->prepare("UPDATE users SET password_hash = ? WHERE id = ?"); $stmt->execute([$data->new_password, $data->user_id]); echo json_encode(["status" => "success"]); } else { http_response_code(400); echo json_encode(["error" => "Invalid data"]); } ?>