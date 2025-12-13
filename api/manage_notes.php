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
    $stmt = $conn->query("SELECT * FROM chapter_notes");
    $notes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $map = [];
    foreach($notes as $n) {
        $n['pages'] = json_decode($n['pages_json']);
        unset($n['pages_json']);
        $map[$n['topic_id']] = $n;
    }
    echo json_encode($map);
}
elseif ($method === 'POST') {
    $stmt = $conn->prepare("INSERT INTO chapter_notes (topic_id, pages_json) VALUES (?, ?) ON DUPLICATE KEY UPDATE pages_json = ?");
    $json = json_encode($data->pages);
    $stmt->execute([$data->topicId, $json, $json]);
    echo json_encode(["message" => "Saved"]);
}
elseif ($method === 'DELETE') {
    $topicId = $_GET['topicId'];
    if($topicId) {
        $stmt = $conn->prepare("DELETE FROM chapter_notes WHERE topic_id = ?");
        $stmt->execute([$topicId]);
        echo json_encode(["message" => "Deleted"]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "No topicId provided"]);
    }
}
?>