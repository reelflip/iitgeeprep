<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$user_id = $_GET['user_id'] ?? '';
if(!$user_id) { echo json_encode(["error" => "No User ID"]); exit(); }
try {
    $response = [];
    $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?"); $stmt->execute([$user_id]); $u = $stmt->fetch(PDO::FETCH_ASSOC);
    if($u) $response['userProfileSync'] = ["id" => $u['id'], "name" => $u['name'], "email" => $u['email'], "role" => $u['role'], "targetExam" => $u['target_exam'], "targetYear" => $u['target_year'], "institute" => $u['institute'], "parentId" => $u['parent_id'], "linkedStudentId" => $u['linked_student_id'], "isVerified" => $u['is_verified'], "school" => $u['school'], "phone" => $u['phone'], "avatarUrl" => $u['avatar_url']];
    $stmt = $conn->prepare("SELECT * FROM user_progress WHERE user_id = ?"); $stmt->execute([$user_id]); $rawProgress = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    $response['progress'] = []; foreach($rawProgress as $p) $response['progress'][] = ["topic_id" => $p['topic_id'], "status" => $p['status'], "last_revised" => $p['last_revised'], "revision_level" => (int)$p['revision_level'], "next_revision_date" => $p['next_revision_date'], "solved_questions_json" => $p['solved_questions_json']];
    $stmt = $conn->prepare("SELECT * FROM test_attempts WHERE user_id = ? ORDER BY date DESC"); $stmt->execute([$user_id]); $response['attempts'] = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    $stmt = $conn->prepare("SELECT * FROM goals WHERE user_id = ?"); $stmt->execute([$user_id]); $response['goals'] = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    $stmt = $conn->prepare("SELECT * FROM mistake_logs WHERE user_id = ?"); $stmt->execute([$user_id]); $response['mistakes'] = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    $stmt = $conn->prepare("SELECT * FROM backlogs WHERE user_id = ?"); $stmt->execute([$user_id]); $response['backlogs'] = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    $stmt = $conn->prepare("SELECT * FROM timetable WHERE user_id = ?"); $stmt->execute([$user_id]); $tt = $stmt->fetch(PDO::FETCH_ASSOC);
    if($tt) $response['timetable'] = ['config' => json_decode($tt['config_json']), 'slots' => json_decode($tt['slots_json'])];
    $stmt = $conn->prepare("SELECT * FROM notifications WHERE to_id = ? ORDER BY created_at DESC"); $stmt->execute([$user_id]); $response['notifications'] = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    echo json_encode($response);
} catch(Exception $e) { http_response_code(500); echo json_encode(["error" => $e->getMessage()]); } ?>