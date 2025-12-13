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

$common = [];
$common['flashcards'] = $conn->query("SELECT * FROM flashcards")->fetchAll(PDO::FETCH_ASSOC);
$common['hacks'] = $conn->query("SELECT * FROM memory_hacks")->fetchAll(PDO::FETCH_ASSOC);
$common['blogs'] = $conn->query("SELECT * FROM blog_posts ORDER BY date DESC")->fetchAll(PDO::FETCH_ASSOC);
$videos = $conn->query("SELECT * FROM videos")->fetchAll(PDO::FETCH_ASSOC);
$vMap = [];
foreach($videos as $v) $vMap[$v['topic_id']] = $v;
$common['videoMap'] = $vMap;
$notes = $conn->query("SELECT * FROM chapter_notes")->fetchAll(PDO::FETCH_ASSOC);
$nMap = [];
foreach($notes as $n) {
    $n['pages'] = json_decode($n['pages_json']);
    unset($n['pages_json']);
    $nMap[$n['topic_id']] = $n;
}
$common['noteMap'] = $nMap;
$common['notifications'] = $conn->query("SELECT * FROM notifications WHERE type='INFO'")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($common);
?>