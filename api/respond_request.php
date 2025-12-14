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
if($data && isset($data->accept) && $data->accept) {
    // Link users
    $conn->prepare("UPDATE users SET parent_id = ? WHERE id = ?")->execute([$data->parent_id, $data->student_id]);
    $conn->prepare("UPDATE users SET linked_student_id = ? WHERE id = ?")->execute([$data->student_id, $data->parent_id]);
    // Delete notification
    $conn->prepare("DELETE FROM notifications WHERE id = ?")->execute([$data->notification_id]);
    echo json_encode(["status" => "success"]);
} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid Request"]);
}
?>