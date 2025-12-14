<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

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
    try {
        $reportJson = json_encode($data->report);
        
        $sql = "INSERT INTO psychometric_results (user_id, report_json, date) 
                VALUES (?, ?, NOW()) 
                ON DUPLICATE KEY UPDATE report_json = VALUES(report_json), date = NOW()";
                
        $stmt = $conn->prepare($sql);
        $stmt->execute([$data->user_id, $reportJson]);
        
        echo json_encode(["status" => "success"]);
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input"]);
}
?>