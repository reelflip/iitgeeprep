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

if ($method === 'GET') {
    $stmt = $conn->query("SELECT * FROM notifications WHERE type = 'BROADCAST' OR type = 'INFO' ORDER BY created_at DESC");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($method === 'POST') {
    $stmt = $conn->prepare("INSERT INTO notifications (id, title, message, type) VALUES (?, ?, ?, 'BROADCAST')");
    $id = uniqid('notif_');
    $stmt->execute([$id, $data->title, $data->message]);
    echo json_encode(["message" => "Broadcast Sent"]);
} elseif ($method === 'DELETE') {
     $id = $_GET['id'];
     $conn->prepare("DELETE FROM notifications WHERE id = ?")->execute([$id]);
     echo json_encode(["message" => "Deleted"]);
}
?>