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

$data = json_decode(file_get_contents('php://input'));
// In production, verify Google JWT token here
$email = $data->email ?? 'social_user@gmail.com'; 
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$u = $stmt->fetch(PDO::FETCH_ASSOC);
if(!$u) {
    $id = str_pad(mt_rand(1, 999999), 6, '0', STR_PAD_LEFT);
    $conn->prepare("INSERT INTO users (id, name, email, role) VALUES (?, ?, ?, ?)")->execute([$id, $data->name, $email, $data->role]);
    $stmt->execute([$email]);
    $u = $stmt->fetch(PDO::FETCH_ASSOC);
}
echo json_encode(["status" => "success", "user" => $u]);
?>