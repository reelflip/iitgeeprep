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
$id = str_pad(mt_rand(1, 999999), 6, '0', STR_PAD_LEFT);
$hash = password_hash($data->password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (id, name, email, password_hash, role, target_exam) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->execute([$id, $data->name, $data->email, $hash, $data->role, $data->targetExam ?? 'JEE']);
echo json_encode(["status" => "success", "user" => ["id" => $id, "name" => $data->name]]);
?>