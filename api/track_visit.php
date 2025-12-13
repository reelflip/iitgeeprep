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

$stmt = $conn->query("SELECT setting_value FROM system_settings WHERE setting_key = 'total_visits'");
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if ($row) {
    $newVal = intval($row['setting_value']) + 1;
    $conn->prepare("UPDATE system_settings SET setting_value = ? WHERE setting_key = 'total_visits'")->execute([$newVal]);
} else {
    $conn->prepare("INSERT INTO system_settings (setting_key, setting_value) VALUES ('total_visits', '1')")->execute();
}
echo json_encode(["status" => "tracked"]);
?>