<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'config.php';

$user_id = $_GET['user_id'] ?? null;
if($user_id) {
    $stmt = $conn->prepare("SELECT report_json FROM psychometric_results WHERE user_id = ? ORDER BY date DESC LIMIT 1");
    $stmt->execute([$user_id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if($row) {
        echo json_encode(["report" => json_decode($row['report_json'])]);
    } else {
        echo json_encode(["report" => null]);
    }
}
?>