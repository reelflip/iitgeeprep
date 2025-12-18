<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $stmt = $conn->query("SELECT * FROM chapter_notes");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $notes = [];
    foreach($rows as $r) {
        $notes[$r['topic_id']] = [
            'id' => (int)$r['id'],
            'topicId' => $r['topic_id'],
            'pages' => json_decode($r['content_json']),
            'lastUpdated' => $r['updated_at']
        ];
    }
    echo json_encode($notes);
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'));
    $stmt = $conn->prepare("INSERT INTO chapter_notes (topic_id, content_json) VALUES (?, ?) ON DUPLICATE KEY UPDATE content_json = VALUES(content_json)");
    $stmt->execute([$data->topic_id, json_encode($data->pages)]);
    echo json_encode(["status" => "success"]);
}
?>