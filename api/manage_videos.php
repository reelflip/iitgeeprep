<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $stmt = $conn->query("SELECT * FROM video_lessons");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'));
    $stmt = $conn->prepare("INSERT INTO video_lessons (topic_id, url, description) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE url = VALUES(url), description = VALUES(description)");
    $stmt->execute([$data->topicId, $data->url, $data->description]);
    echo json_encode(["status" => "success"]);
}
?>