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

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'GET') {
    $stmt = $conn->query("SELECT id, name, email, role, is_verified, created_at FROM users ORDER BY created_at DESC");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));
    $val = $data->isVerified ? 1 : 0;
    $conn->prepare("UPDATE users SET is_verified = ? WHERE id = ?")->execute([$val, $data->id]);
    echo json_encode(["message" => "Updated"]);
} elseif ($method === 'DELETE') {
    $conn->prepare("DELETE FROM users WHERE id = ?")->execute([$_GET['id']]);
    echo json_encode(["message" => "Deleted"]);
}
?>