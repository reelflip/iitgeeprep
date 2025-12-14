<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
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