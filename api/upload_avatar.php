<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

// Placeholder for base64 or file upload handling
$data = json_decode(file_get_contents('php://input'));
if(!empty($data->user_id) && !empty($data->avatar_url)) {
    $stmt = $conn->prepare("UPDATE users SET avatar_url = ? WHERE id = ?");
    $stmt->execute([$data->avatar_url, $data->user_id]);
    echo json_encode(["status" => "success"]);
}
?>