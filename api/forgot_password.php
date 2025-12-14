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
$stmt = $conn->prepare("SELECT security_question FROM users WHERE email = ?");
$stmt->execute([$data->email]);
if($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo json_encode(["status" => "success", "question" => $row['security_question']]);
} else {
    echo json_encode(["status" => "error", "message" => "Email not found"]);
}
?>