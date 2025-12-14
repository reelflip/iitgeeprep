<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$data = json_decode(file_get_contents("php://input"));
try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['user_id'])) {
        $stmt = $conn->prepare("SELECT * FROM goals WHERE user_id = ?");
        $stmt->execute([$_GET['user_id']]);
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $stmt = $conn->prepare("INSERT INTO goals (id, user_id, text, completed) VALUES (?, ?, ?, 0)");
        $stmt->execute([$data->id, $data->user_id, $data->text]);
        echo json_encode(["message" => "Goal Added"]);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $conn->prepare("UPDATE goals SET completed = ? WHERE id = ?")->execute([$data->completed ? 1 : 0, $data->id]);
        echo json_encode(["message" => "Updated"]);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $conn->prepare("DELETE FROM goals WHERE id = ?")->execute([$_GET['id']]);
        echo json_encode(["message" => "Deleted"]);
    }
} catch(Exception $e) {
    http_response_code(500); echo json_encode(["error" => $e->getMessage()]);
}
?>