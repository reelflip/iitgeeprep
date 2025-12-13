<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

$user_id = $_GET['user_id'] ?? null;
if ($user_id) {
    $stmt = $conn->prepare("SELECT report_json, created_at FROM psychometric_results WHERE user_id = ? ORDER BY created_at DESC LIMIT 1");
    $stmt->execute([$user_id]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($result) {
        echo json_encode([
            "report" => json_decode($result['report_json']),
            "date" => $result['created_at']
        ]);
    } else {
        echo json_encode(["message" => "No report found"]);
    }
}
?>