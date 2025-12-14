<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

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
    $stmt = $conn->query("SELECT * FROM topics");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $stmt = $conn->prepare("INSERT INTO topics (id, name, chapter, subject) VALUES (?, ?, ?, ?)");
    $stmt->execute([$data->id, $data->name, $data->chapter, $data->subject]);
    echo json_encode(["message" => "Created"]);
} elseif ($method === 'DELETE') {
    $conn->prepare("DELETE FROM topics WHERE id = ?")->execute([$_GET['id']]);
    echo json_encode(["message" => "Deleted"]);
}
?>