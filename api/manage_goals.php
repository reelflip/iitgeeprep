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
$method = $_SERVER['REQUEST_METHOD'];
$user_id = $_GET['user_id'] ?? $data->user_id ?? null;

if ($method === 'GET' && $user_id) {
    $stmt = $conn->prepare("SELECT * FROM goals WHERE user_id = ? AND date(created_at) = CURDATE()");
    $stmt->execute([$user_id]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($method === 'POST') {
    $stmt = $conn->prepare("INSERT INTO goals (id, user_id, text, completed) VALUES (?, ?, ?, 0)");
    $stmt->execute([$data->id, $data->user_id, $data->text]);
    echo json_encode(["message" => "Goal Added"]);
} elseif ($method === 'PUT') {
    $stmt = $conn->prepare("UPDATE goals SET completed = ? WHERE id = ?");
    $stmt->execute([$data->completed ? 1 : 0, $data->id]);
    echo json_encode(["message" => "Updated"]);
}
?>