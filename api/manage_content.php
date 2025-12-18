<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$type = $_GET['type'] ?? '';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if($type) {
        $stmt = $conn->prepare("SELECT * FROM content WHERE type = ? ORDER BY created_at DESC");
        $stmt->execute([$type]);
    } else {
        $stmt = $conn->query("SELECT * FROM content ORDER BY created_at DESC");
    }
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'));
    $stmt = $conn->prepare("INSERT INTO content (type, title, content_json) VALUES (?, ?, ?)");
    $stmt->execute([$data->type, $data->title, json_encode($data->content)]);
    echo json_encode(["status" => "success", "id" => $conn->lastInsertId()]);
} elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM content WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(["status" => "success"]);
}
?>