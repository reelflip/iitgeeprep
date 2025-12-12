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
$type = $_GET['type'] ?? $data->type;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($type === 'flashcards') {
        $stmt = $conn->query("SELECT * FROM flashcards");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } else if ($type === 'hacks') {
        $stmt = $conn->query("SELECT * FROM memory_hacks");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } else if ($type === 'blogs') {
        $stmt = $conn->query("SELECT * FROM blog_posts ORDER BY date DESC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }
} 
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($type === 'flashcard') {
        $stmt = $conn->prepare("INSERT INTO flashcards (front, back) VALUES (?, ?)");
        $stmt->execute([$data->front, $data->back]);
    } else if ($type === 'hack') {
        $stmt = $conn->prepare("INSERT INTO memory_hacks (title, description, tag, trick) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data->title, $data->description, $data->tag, $data->trick]);
    } else if ($type === 'blog') {
        // Upsert based on ID logic if passed (though ID is AI usually)
        // If ID exists in input and > 0, assume update
        if (isset($data->id) && $data->id > 0) {
             // Check existence first
             $check = $conn->prepare("SELECT id FROM blog_posts WHERE id = ?");
             $check->execute([$data->id]);
             if($check->rowCount() > 0) {
                 $stmt = $conn->prepare("UPDATE blog_posts SET title=?, excerpt=?, content=?, author=?, image_url=?, category=? WHERE id=?");
                 $stmt->execute([$data->title, $data->excerpt, $data->content, $data->author, $data->imageUrl, $data->category ?? 'Strategy', $data->id]);
                 echo json_encode(["message" => "Updated"]);
                 exit;
             }
        }
        
        $stmt = $conn->prepare("INSERT INTO blog_posts (title, excerpt, content, author, image_url, category) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$data->title, $data->excerpt, $data->content, $data->author, $data->imageUrl, $data->category ?? 'Strategy']);
    }
    echo json_encode(["message" => "Created"]);
}
elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    if ($type === 'flashcard') $conn->prepare("DELETE FROM flashcards WHERE id = ?")->execute([$id]);
    if ($type === 'hack') $conn->prepare("DELETE FROM memory_hacks WHERE id = ?")->execute([$id]);
    if ($type === 'blog') $conn->prepare("DELETE FROM blog_posts WHERE id = ?")->execute([$id]);
    echo json_encode(["message" => "Deleted"]);
}
?>