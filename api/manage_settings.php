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

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'GET') {
    $key = $_GET['key'];
    $stmt = $conn->prepare("SELECT value FROM settings WHERE setting_key = ?");
    $stmt->execute([$key]);
    $res = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($res ? $res : ["value" => null]);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $stmt = $conn->prepare("INSERT INTO settings (setting_key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?");
    $stmt->execute([$data->key, $data->value, $data->value]);
    echo json_encode(["status" => "saved"]);
}
?>