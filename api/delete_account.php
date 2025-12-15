<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';
 $data = json_decode(file_get_contents("php://input")); if($data->id) { try { $conn->prepare("DELETE FROM users WHERE id = ?")->execute([$data->id]); $conn->prepare("DELETE FROM user_progress WHERE user_id = ?")->execute([$data->id]); $conn->prepare("DELETE FROM test_attempts WHERE user_id = ?")->execute([$data->id]); echo json_encode(["status" => "success"]); } catch(Exception $e) { http_response_code(500); echo json_encode(["error" => $e->getMessage()]); } } ?>