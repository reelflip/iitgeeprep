<?php
error_reporting(0); // Suppress warnings to ensure clean JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'config.php';

$data = json_decode(file_get_contents("php://input"));
if(!empty($data->user_id) && !empty($data->report)) {
    // Check if exists
    $check = $conn->prepare("SELECT id FROM psychometric_results WHERE user_id = ?");
    $check->execute([$data->user_id]);
    
    $reportJson = json_encode($data->report);
    
    if($check->rowCount() > 0) {
        $stmt = $conn->prepare("UPDATE psychometric_results SET report_json = ?, date = NOW() WHERE user_id = ?");
        $stmt->execute([$reportJson, $data->user_id]);
    } else {
        $stmt = $conn->prepare("INSERT INTO psychometric_results (user_id, report_json, date) VALUES (?, ?, NOW())");
        $stmt->execute([$data->user_id, $reportJson]);
    }
    echo json_encode(["status" => "success"]);
} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input"]);
}
?>