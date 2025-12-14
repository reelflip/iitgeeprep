<?php
error_reporting(0); // Suppress warnings to ensure clean JSON
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
if($data && isset($data->action) && $data->action === 'send') {
    // Verify student exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE id = ? AND role = 'STUDENT'");
    $stmt->execute([$data->student_identifier]);
    if($stmt->rowCount() > 0) {
        // Create Notification
        $notif_id = uniqid('notif_');
        $sql = "INSERT INTO notifications (id, from_id, from_name, to_id, type, message) VALUES (?, ?, ?, ?, 'connection_request', 'Parent Connection Request')";
        $conn->prepare($sql)->execute([$notif_id, $data->parent_id, $data->parent_name, $data->student_identifier]);
        echo json_encode(["message" => "Request Sent"]);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Student Not Found"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid Request"]);
}
?>