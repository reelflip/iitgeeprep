<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';
 $user_id = $_GET['user_id'] ?? ''; if($user_id) { try { $stmt = $conn->prepare("SELECT * FROM psychometric_results WHERE user_id = ? ORDER BY id DESC LIMIT 1"); $stmt->execute([$user_id]); $res = $stmt->fetch(PDO::FETCH_ASSOC); if($res && !empty($res['report_json'])) { echo json_encode(["status" => "success", "report" => json_decode($res['report_json'])]); } else { echo json_encode(["status" => "empty", "report" => null]); } } catch(Exception $e) { http_response_code(500); echo json_encode(["error" => $e->getMessage()]); } } ?>