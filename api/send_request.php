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
if ($data->action === 'search') {
    $q = "%".$data->query."%";
    $stmt = $conn->prepare("SELECT id, name, email FROM users WHERE (id LIKE ? OR name LIKE ? OR email LIKE ?) AND role = 'STUDENT'");
    $stmt->execute([$data->query, $q, $data->query]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} else {
    $stmt = $conn->prepare("INSERT INTO notifications (id, user_id, from_id, from_name, type, message) VALUES (?, ?, ?, ?, 'connection_request', 'Wants to link account')");
    $stmt->execute([uniqid('notif_'), $data->student_identifier, $data->parent_id, $data->parent_name]);
    echo json_encode(["message" => "Request Sent"]);
}
?>