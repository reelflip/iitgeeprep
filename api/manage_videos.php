<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';
 $data = json_decode(file_get_contents("php://input")); if($data->topicId) { $check = $conn->prepare("SELECT id FROM video_lessons WHERE topic_id = ?"); $check->execute([$data->topicId]); if($check->rowCount() > 0) { $conn->prepare("UPDATE video_lessons SET url = ?, description = ? WHERE topic_id = ?")->execute([$data->url, $data->desc, $data->topicId]); } else { $conn->prepare("INSERT INTO video_lessons (topic_id, url, description) VALUES (?, ?, ?)")->execute([$data->topicId, $data->url, $data->desc]); } echo json_encode(["status" => "success"]); } ?>