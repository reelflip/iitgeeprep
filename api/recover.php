<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

$data = json_decode(file_get_contents("php://input"));
$action = $data->action;

if ($action === 'get_question') {
    $stmt = $conn->prepare("SELECT security_question FROM users WHERE email = ?");
    $stmt->execute([$data->email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user && $user['security_question']) {
        echo json_encode(["status" => "success", "question" => $user['security_question']]);
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "User not found or no question set"]);
    }
} elseif ($action === 'verify_reset') {
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ? AND security_answer = ?");
    $stmt->execute([$data->email, $data->answer]);
    if ($stmt->rowCount() > 0) {
        $upd = $conn->prepare("UPDATE users SET password_hash = ? WHERE email = ?");
        $upd->execute([$data->newPassword, $data->email]);
        echo json_encode(["status" => "success", "message" => "Password updated"]);
    } else {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Incorrect security answer"]);
    }
}
?>