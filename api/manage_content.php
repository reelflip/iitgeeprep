<?php
/**
 * IITGEEPrep Engine v12.43 - Command Central Core
 * 100% Complete 38-File Backend Deployment
 */
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

include_once 'cors.php';
include_once 'config.php';

function getJsonInput() {
    $raw = file_get_contents('php://input');
    if (!$raw) return null;
    $data = json_decode($raw);
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(["error" => "INVALID_JSON", "details" => json_last_error_msg()]);
        exit;
    }
    return $data;
}

function getV($data, $p) {
    if (!$data) return null;
    if (isset($data->$p)) return $data->$p;
    $snake = strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $p));
    if (isset($data->$snake)) return $data->$snake;
    return null;
}

$d = getJsonInput();
$type = $_GET['type'] ?? 'flashcard';
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    if($type === 'flashcard') {
        $s = $conn->prepare("INSERT INTO flashcards (front, back, subject_id) VALUES (?,?,?)");
        $s->execute([getV($d, 'front'), getV($d, 'back'), getV($d, 'subjectId')]);
    } else if($type === 'hack') {
        $s = $conn->prepare("INSERT INTO memory_hacks (title, description, trick, tag) VALUES (?,?,?,?)");
        $s->execute([getV($d, 'title'), getV($d, 'description'), getV($d, 'trick'), getV($d, 'tag')]);
    } else if($type === 'blog') {
        $id = getV($d, 'id');
        if($id && is_numeric($id) && $id > 100000000) { // New post check
             $s = $conn->prepare("INSERT INTO blog_posts (title, excerpt, content, author, image_url, category) VALUES (?,?,?,?,?,?)");
             $s->execute([getV($d, 'title'), getV($d, 'excerpt'), getV($d, 'content'), getV($d, 'author'), getV($d, 'imageUrl'), getV($d, 'category')]);
        } else {
             $s = $conn->prepare("UPDATE blog_posts SET title=?, excerpt=?, content=?, author=?, image_url=?, category=? WHERE id=?");
             $s->execute([getV($d, 'title'), getV($d, 'excerpt'), getV($d, 'content'), getV($d, 'author'), getV($d, 'imageUrl'), getV($d, 'category'), $id]);
        }
    }
    echo json_encode(["status" => "success", "id" => $conn->lastInsertId()]);
} else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $table = $type === 'flashcard' ? 'flashcards' : ($type === 'hack' ? 'memory_hacks' : 'blog_posts');
    $conn->prepare("DELETE FROM $table WHERE id = ?")->execute([$_GET['id']]);
    echo json_encode(["status" => "success"]);
}
?>