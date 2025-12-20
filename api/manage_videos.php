<?php
/**
 * IITGEEPrep Pro Engine v12.27
 * Production Backend Infrastructure
 * Optimized for Hostinger/LAMP Stack
 */
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($conn->query("SELECT * FROM video_lessons")->fetchAll(PDO::FETCH_ASSOC));
} else if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $d = json_decode(file_get_contents('php://input'));
    $conn->prepare("INSERT INTO video_lessons (topic_id, url, description) VALUES (?,?,?) ON DUPLICATE KEY UPDATE url=VALUES(url), description=VALUES(description)")
         ->execute([$d->topicId, $d->url, $d->description]);
    echo json_encode(["status" => "success"]);
}
?>