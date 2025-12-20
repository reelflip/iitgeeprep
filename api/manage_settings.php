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
    $stmt = $conn->prepare("SELECT value FROM settings WHERE setting_key = ?");
    $stmt->execute([$_GET['key']]);
    echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
} else {
    $d = json_decode(file_get_contents('php://input'));
    $sql = "INSERT INTO settings (setting_key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)";
    $conn->prepare($sql)->execute([$d->key, $d->value]);
    echo json_encode(["status" => "success"]);
}
?>