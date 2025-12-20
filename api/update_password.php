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
$hash = password_hash($data->new_password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("UPDATE users SET password_hash = ? WHERE id = ?");
$stmt->execute([$hash, $data->user_id]);
echo json_encode(["status" => "success"]);
?>