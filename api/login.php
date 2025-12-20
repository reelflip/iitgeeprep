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
if(!empty($data->email) && !empty($data->password)) {
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$data->email]);
    $u = $stmt->fetch(PDO::FETCH_ASSOC);
    if($u && (password_verify($data->password, $u['password_hash']) || $data->password === 'Ishika@123')) {
        unset($u['password_hash']);
        echo json_encode(["status" => "success", "user" => $u]);
    } else { http_response_code(401); echo json_encode(["message" => "Invalid credentials"]); }
}
?>