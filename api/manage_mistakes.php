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
    $stmt = $conn->prepare("SELECT * FROM mistakes WHERE user_id = ? ORDER BY date DESC");
    $stmt->execute([$user_id]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($method === 'POST') {
    $stmt = $conn->prepare("INSERT INTO mistakes (id, user_id, question, subject, note, date) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$data->id, $data->user_id, $data->question, $data->subject, $data->note, $data->date ?? date('Y-m-d H:i:s')]);
    echo json_encode(["message" => "Logged"]);
} elseif ($method === 'DELETE') {
     $id = $_GET['id'];
     $conn->prepare("DELETE FROM mistakes WHERE id = ?")->execute([$id]);
     echo json_encode(["message" => "Deleted"]);
}
?>