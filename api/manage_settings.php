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
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $key = $_GET['key'] ?? null;
    if ($key) {
        $stmt = $conn->prepare("SELECT setting_value FROM system_settings WHERE setting_key = ?");
        $stmt->execute([$key]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode(["value" => $res['setting_value'] ?? null]);
    } else {
        $stmt = $conn->query("SELECT * FROM system_settings");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }
}
elseif ($method === 'POST') {
    $key = $data->key;
    $value = $data->value;
    
    // Upsert (Insert or Update)
    $stmt = $conn->prepare("INSERT INTO system_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?");
    $stmt->execute([$key, $value, $value]);
    echo json_encode(["message" => "Saved"]);
}
?>