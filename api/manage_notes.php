<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $content = json_encode($data->pages);
    $check = $conn->prepare("SELECT id FROM chapter_notes WHERE topic_id = ?");
    $check->execute([$data->topicId]);
    if($check->rowCount() > 0) {
        // Updated to set content_json
        $conn->prepare("UPDATE chapter_notes SET content_json = ?, updated_at = NOW() WHERE topic_id = ?")->execute([$content, $data->topicId]);
    } else {
        $conn->prepare("INSERT INTO chapter_notes (topic_id, content_json, updated_at) VALUES (?, ?, NOW())")->execute([$data->topicId, $content]);
    }
    echo json_encode(["status" => "success"]);
} elseif ($method === 'GET') {
    $stmt = $conn->query("SELECT topic_id, content_json FROM chapter_notes");
    $results = [];
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $results[$row['topic_id']] = ['pages' => json_decode($row['content_json'])];
    }
    echo json_encode($results);
}
?>