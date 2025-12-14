<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$user_id = $_GET['user_id'] ?? '';
if(!$user_id) {
    echo json_encode(["error" => "No User ID"]);
    exit();
}

try {
    $response = [];

    // Profile (Aliased columns for React compatibility)
    $stmt = $conn->prepare("SELECT id, name, email, role, target_exam as targetExam, target_year as targetYear, institute, parent_id as parentId, linked_student_id as linkedStudentId, is_verified as isVerified, school, phone, avatar_url as avatarUrl FROM users WHERE id = ?");
    $stmt->execute([$user_id]);
    $response['userProfileSync'] = $stmt->fetch(PDO::FETCH_ASSOC);

    // Progress
    $stmt = $conn->prepare("SELECT * FROM user_progress WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $response['progress'] = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

    // Attempts
    $stmt = $conn->prepare("SELECT * FROM test_attempts WHERE user_id = ? ORDER BY date DESC");
    $stmt->execute([$user_id]);
    $attempts = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    // Properly decode JSON for React
    foreach($attempts as &$att) {
        $att['detailedResults'] = json_decode($att['detailed_results']) ?: [];
    }
    $response['attempts'] = $attempts;

    // Goals
    $stmt = $conn->prepare("SELECT * FROM goals WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $response['goals'] = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

    // Mistakes
    $stmt = $conn->prepare("SELECT * FROM mistake_logs WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $response['mistakes'] = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

    // Backlogs
    $stmt = $conn->prepare("SELECT * FROM backlogs WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $response['backlogs'] = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

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
    $response['notifications'] = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

    echo json_encode($response);
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>