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
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ? AND security_answer = ?");
$stmt->execute([$data->email, $data->answer]);
if($stmt->rowCount() > 0) {
    $conn->prepare("UPDATE users SET password_hash = ? WHERE email = ?")->execute([$data->new_password, $data->email]);
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "Incorrect security answer"]);
}
?>