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

$user_id = $_GET['user_id'];
$response = [];

// Profile
$stmt = $conn->prepare("SELECT id, name, email, role, target_exam, target_year, institute, parent_id, linked_student_id, is_verified FROM users WHERE id = ?");
$stmt->execute([$user_id]);
$response['userProfileSync'] = $stmt->fetch(PDO::FETCH_ASSOC);

// Progress
$stmt = $conn->prepare("SELECT * FROM user_progress WHERE user_id = ?");
$stmt->execute([$user_id]);
$response['progress'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Attempts
$stmt = $conn->prepare("SELECT * FROM test_attempts WHERE user_id = ?");
$stmt->execute([$user_id]);
$attempts = $stmt->fetchAll(PDO::FETCH_ASSOC);
// Decode detailed results
foreach($attempts as &$att) {
    $att['detailedResults'] = json_decode($att['detailed_results']);
}
$response['attempts'] = $attempts;

// Goals
$stmt = $conn->prepare("SELECT * FROM goals WHERE user_id = ?");
$stmt->execute([$user_id]);
$response['goals'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Mistakes
$stmt = $conn->prepare("SELECT * FROM mistake_logs WHERE user_id = ?");
$stmt->execute([$user_id]);
$response['mistakes'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Backlogs
$stmt = $conn->prepare("SELECT * FROM backlogs WHERE user_id = ?");
$stmt->execute([$user_id]);
$response['backlogs'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Timetable
$stmt = $conn->prepare("SELECT config_json, slots_json FROM timetable WHERE user_id = ?");
$stmt->execute([$user_id]);
$tt = $stmt->fetch(PDO::FETCH_ASSOC);
if($tt) {
    $response['timetable'] = ['config' => json_decode($tt['config_json']), 'slots' => json_decode($tt['slots_json'])];
}

// Notifications
$stmt = $conn->prepare("SELECT * FROM notifications WHERE to_id = ? ORDER BY created_at DESC");
$stmt->execute([$user_id]);
$response['notifications'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($response);
?>