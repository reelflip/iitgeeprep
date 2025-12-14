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

$data = json_decode(file_get_contents("php://input"));
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['user_id'])) {
    $stmt = $conn->prepare("SELECT * FROM mistake_logs WHERE user_id = ? ORDER BY date DESC");
    $stmt->execute([$_GET['user_id']]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $conn->prepare("INSERT INTO mistake_logs (id, user_id, question, subject, note, date) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$data->id, $data->user_id, $data->question, $data->subject, $data->note, $data->date]);
    echo json_encode(["message" => "Saved"]);
}
?>