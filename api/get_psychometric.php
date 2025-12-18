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
        $stmt = $conn->prepare("SELECT report_json FROM psychometric_results WHERE user_id = ?");
        $stmt->execute([$user_id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode(["report" => $row ? json_decode($row['report_json']) : null]);
    } catch(Exception $e) { http_response_code(500); }
}
?>