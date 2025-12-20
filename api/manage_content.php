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

$type = $_GET['type'] ?? 'blog';
if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->prepare("SELECT * FROM content WHERE type = ? ORDER BY created_at DESC");
    $stmt->execute([$type]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} else if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $d = json_decode(file_get_contents('php://input'));
    $sql = "INSERT INTO content (type, content_json) VALUES (?, ?)";
    $conn->prepare($sql)->execute([$d->type, json_encode($d->content)]);
    echo json_encode(["status" => "success", "id" => $conn->lastInsertId()]);
} else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $conn->prepare("DELETE FROM content WHERE id = ?")->execute([$_GET['id']]);
    echo json_encode(["status" => "success"]);
}
?>