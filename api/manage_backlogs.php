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

$data = json_decode(file_get_contents("php://input"));
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($data->id)) {
        try {
            $stmt = $conn->prepare("INSERT INTO backlogs (id, user_id, title, subject, priority, status, deadline) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$data->id, $data->user_id, $data->title, $data->subject, $data->priority, $data->status, $data->deadline]);
            echo json_encode(["message" => "Saved"]);
        } catch(Exception $e) { http_response_code(500); echo json_encode(["error" => $e->getMessage()]); }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Missing ID"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    try {
        $conn->prepare("DELETE FROM backlogs WHERE id = ?")->execute([$_GET['id']]);
        echo json_encode(["message" => "Deleted"]);
    } catch(Exception $e) { http_response_code(500); echo json_encode(["error" => $e->getMessage()]); }
}
?>