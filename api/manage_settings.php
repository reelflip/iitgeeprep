<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
try {
    if ($method === 'GET') {
        $key = $_GET['key'] ?? '';
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
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>