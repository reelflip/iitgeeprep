<?php
/**
 * IITGEEPrep Engine v13.0 - Ultimate Sync Core
 * Production Backend Deployment
 */
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

include_once 'cors.php';
include_once 'config.php';

function getJsonInput() {
    $raw = file_get_contents('php://input');
    if (!$raw || $raw === '{}') return null;
    $data = json_decode($raw);
    return (json_last_error() === JSON_ERROR_NONE) ? $data : null;
}

function getV($data, $p, $default = null) {
    if (!$data) return $default;
    if (isset($data->$p)) return $data->$p;
    $snake = strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $p));
    if (isset($data->$snake)) return $data->$snake;
    return $default;
}

function sendError($msg, $code = 400) {
    http_response_code($code);
    echo json_encode(["status" => "error", "message" => $msg]);
    exit;
}

function sendSuccess($data = []) {
    echo json_encode(array_merge(["status" => "success"], $data));
    exit;
}

// Global Health Check Handler
if ($_SERVER['REQUEST_METHOD'] === 'POST' && empty(file_get_contents('php://input'))) {
    echo json_encode(["status" => "active", "message" => "Logic hub is reachable"]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$data = getJsonInput();
try {
    if ($method === 'POST') {
        $type = $_GET['type'] ?? '';
        if ($type === 'flashcard') { $conn->prepare("INSERT INTO flashcards (front, back, subject_id) VALUES (?, ?, ?)")->execute([getV($data, 'front'), getV($data, 'back'), getV($data, 'subjectId')]); }
        else if ($type === 'hack') { $conn->prepare("INSERT INTO memory_hacks (title, description, trick, tag) VALUES (?, ?, ?, ?)")->execute([getV($data, 'title'), getV($data, 'description'), getV($data, 'trick'), getV($data, 'tag')]); }
        else if ($type === 'blog') { $conn->prepare("INSERT INTO blog_posts (title, excerpt, content, author, image_url, category) VALUES (?, ?, ?, ?, ?, ?)")->execute([getV($data, 'title'), getV($data, 'excerpt'), getV($data, 'content'), getV($data, 'author'), getV($data, 'imageUrl'), getV($data, 'category')]); }
        sendSuccess();
    } else if ($method === 'DELETE') {
        $type = $_GET['type'];
        $table = $type === 'flashcard' ? 'flashcards' : ($type === 'hack' ? 'memory_hacks' : 'blog_posts');
        $conn->prepare("DELETE FROM $table WHERE id = ?")->execute([$_GET['id']]);
        sendSuccess();
    }
} catch (Exception $e) { sendError($e->getMessage(), 500); }