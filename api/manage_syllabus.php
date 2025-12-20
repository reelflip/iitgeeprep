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
    echo json_encode($conn->query("SELECT * FROM topics")->fetchAll(PDO::FETCH_ASSOC));
} else if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $d = json_decode(file_get_contents('php://input'));
    $conn->prepare("INSERT INTO topics (id, name, chapter, subject) VALUES (?,?,?,?)")
         ->execute([$d->id, $d->name, $d->chapter, $d->subject]);
    echo json_encode(["status" => "success"]);
}
?>