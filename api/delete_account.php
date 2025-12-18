<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$user_id = $_GET['user_id'] ?? '';
if($user_id) {
    try {
        $conn->prepare("DELETE FROM users WHERE id = ?")->execute([$user_id]);
        $conn->prepare("DELETE FROM user_progress WHERE user_id = ?")->execute([$user_id]);
        $conn->prepare("DELETE FROM test_attempts WHERE user_id = ?")->execute([$user_id]);
        echo json_encode(["status" => "success"]);
    } catch(Exception $e) { http_response_code(500); }
}
?>