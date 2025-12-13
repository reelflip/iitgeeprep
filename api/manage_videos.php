<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

$data = json_decode(file_get_contents("php://input"));
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->query("SELECT * FROM videos");
    $videos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $map = [];
    foreach($videos as $v) $map[$v['topic_id']] = $v;
    echo json_encode($map);
}
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $check = $conn->prepare("SELECT topic_id FROM videos WHERE topic_id = ?");
    $check->execute([$data->topicId]);
    if($check->rowCount() > 0) {
        $stmt = $conn->prepare("UPDATE videos SET video_url = ?, description = ? WHERE topic_id = ?");
        $stmt->execute([$data->url, $data->desc, $data->topicId]);
    } else {
        $stmt = $conn->prepare("INSERT INTO videos (topic_id, video_url, description) VALUES (?, ?, ?)");
        $stmt->execute([$data->topicId, $data->url, $data->desc]);
    }
    echo json_encode(["message" => "Saved"]);
}
?>