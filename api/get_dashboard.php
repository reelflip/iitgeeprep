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

    // Profile: Use SELECT * to avoid 1054 error if specific columns (school, phone) are missing in DB
    $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$user_id]);
    $u = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if($u) {
        $response['userProfileSync'] = [
            "id" => $u['id'],
            "name" => $u['name'],
            "email" => $u['email'],
            "role" => $u['role'],
            "targetExam" => $u['target_exam'] ?? '',
            "targetYear" => $u['target_year'] ?? 2025,
            "institute" => $u['institute'] ?? '',
            "parentId" => $u['parent_id'] ?? null,
            "linkedStudentId" => $u['linked_student_id'] ?? null,
            "isVerified" => $u['is_verified'] ?? 1,
            "school" => $u['school'] ?? '',
            "phone" => $u['phone'] ?? '',
            "avatarUrl" => $u['avatar_url'] ?? ''
        ];
    } else {
        $response['userProfileSync'] = null;
    }

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
    // Use SELECT * to avoid 1054 if columns missing, handle in PHP
    $stmt = $conn->prepare("SELECT * FROM timetable WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $tt = $stmt->fetch(PDO::FETCH_ASSOC);
    if($tt) {
        // Handle potentially missing keys gracefully
        $config = isset($tt['config_json']) ? $tt['config_json'] : '{}';
        $slots = isset($tt['slots_json']) ? $tt['slots_json'] : '[]';
        $response['timetable'] = ['config' => json_decode($config), 'slots' => json_decode($slots)];
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