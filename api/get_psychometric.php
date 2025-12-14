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

$user_id = $_GET['user_id'] ?? '';
if($user_id) {
    $stmt = $conn->prepare("SELECT * FROM psychometric_results WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $res = $stmt->fetch(PDO::FETCH_ASSOC);
    if($res) {
        echo json_encode(["status" => "success", "report" => json_decode($res['report_json'])]);
    } else {
        echo json_encode(["status" => "empty"]);
    }
}
?>