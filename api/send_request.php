<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';
 $data = json_decode(file_get_contents("php://input")); if($data && isset($data->action) && $data->action === 'send') { try { $stmt = $conn->prepare("SELECT id FROM users WHERE id = ? AND role = 'STUDENT'"); $stmt->execute([$data->student_identifier]); if($stmt->rowCount() > 0) { $notif_id = uniqid('notif_'); $sql = "INSERT INTO notifications (id, from_id, from_name, to_id, type, message) VALUES (?, ?, ?, ?, 'connection_request', 'Parent Connection Request')"; $conn->prepare($sql)->execute([$notif_id, $data->parent_id, $data->parent_name, $data->student_identifier]); echo json_encode(["message" => "Request Sent"]); } else { http_response_code(404); echo json_encode(["message" => "Student Not Found"]); } } catch(Exception $e) { http_response_code(500); echo json_encode(["error" => $e->getMessage()]); } } else { http_response_code(400); echo json_encode(["error" => "Invalid Request"]); } ?>