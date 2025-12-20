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
    $rows = $conn->query("SELECT * FROM chapter_notes")->fetchAll(PDO::FETCH_ASSOC);
    $map = [];
    foreach($rows as $r) { $map[$r['topic_id']] = ["topicId" => $r['topic_id'], "pages" => json_decode($r['content_json'])]; }
    echo json_encode($map);
} else if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $d = json_decode(file_get_contents('php://input'));
    $conn->prepare("INSERT INTO chapter_notes (topic_id, content_json) VALUES (?,?) ON DUPLICATE KEY UPDATE content_json=VALUES(content_json)")
         ->execute([$d->topicId, json_encode($d->pages)]);
    echo json_encode(["status" => "success"]);
}
?>