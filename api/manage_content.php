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
$type = $_GET['type'] ?? 'flashcard';

if ($method === 'GET') {
    $stmt = $conn->prepare("SELECT * FROM content WHERE type = ?");
    $stmt->execute([$type]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $stmt = $conn->prepare("INSERT INTO content (type, title, content_json) VALUES (?, ?, ?)");
    $stmt->execute([$type, $data->title ?? '', json_encode($data)]);
    echo json_encode(["status" => "success", "id" => $conn->lastInsertId()]);
} elseif ($method === 'DELETE') {
    $conn->prepare("DELETE FROM content WHERE id = ?")->execute([$_GET['id']]);
}
?>