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
if($data->accept) {
    $stmt = $conn->prepare("UPDATE users SET parent_id = ? WHERE id = ?");
    $stmt->execute([$data->parent_id, $data->student_id]);
    $stmt2 = $conn->prepare("UPDATE users SET linked_student_id = ? WHERE id = ?");
    $stmt2->execute([$data->student_id, $data->parent_id]);
    echo json_encode(["message" => "Connected"]);
}
?>