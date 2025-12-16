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

    // Profile
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
    } else { $response['userProfileSync'] = null; }

    // Progress - Return keys matching App.tsx expectations (snake_case)
    $stmt = $conn->prepare("SELECT * FROM user_progress WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $rawProgress = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    $response['progress'] = []; 
    foreach($rawProgress as $p) {
        // Crucial: Use snake_case here because App.tsx reads p.topic_id, p.last_revised, etc.
        $response['progress'][] = [
            "topic_id" => $p['topic_id'], 
            "status" => $p['status'],
            "last_revised" => $p['last_revised'],
            "revision_level" => (int)$p['revision_level'],
            "next_revision_date" => $p['next_revision_date'],
            "solved_questions_json" => $p['solved_questions_json']
        ];
    }

    // Attempts
    $stmt = $conn->prepare("SELECT * FROM test_attempts WHERE user_id = ? ORDER BY date DESC");
    $stmt->execute([$user_id]);
    $rawAttempts = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    $attempts = [];
    foreach($rawAttempts as $att) {
        $attempts[] = [
            "id" => $att['id'],
            "userId" => $att['user_id'],
            "testId" => $att['test_id'],
            "score" => (int)$att['score'],
            "totalMarks" => (int)$att['total_marks'],
            "accuracy_percent" => (float)$att['accuracy'],
            "detailedResults" => !empty($att['detailed_results']) ? json_decode($att['detailed_results']) : [],
            "topicId" => $att['topic_id'],
            "difficulty" => $att['difficulty'],
            "totalQuestions" => (int)($att['total_questions'] ?? 0),
            "correctCount" => (int)($att['correct_count'] ?? 0),
            "incorrectCount" => (int)($att['incorrect_count'] ?? 0),
            "unattemptedCount" => (int)($att['unattempted_count'] ?? 0),
            "date" => $att['date']
        ];
    }
    $response['attempts'] = $attempts;

    $stmt = $conn->prepare("SELECT * FROM goals WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $response['goals'] = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

    $stmt = $conn->prepare("SELECT * FROM mistake_logs WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $response['mistakes'] = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

    $stmt = $conn->prepare("SELECT * FROM backlogs WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $response['backlogs'] = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

    $stmt = $conn->prepare("SELECT * FROM timetable WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $tt = $stmt->fetch(PDO::FETCH_ASSOC);
    if($tt) {
        $config = !empty($tt['config_json']) ? $tt['config_json'] : '{}';
        $slots = !empty($tt['slots_json']) ? $tt['slots_json'] : '[]';
        $response['timetable'] = ['config' => json_decode($config), 'slots' => json_decode($slots)];
    }

    $stmt = $conn->prepare("SELECT * FROM notifications WHERE to_id = ? ORDER BY created_at DESC");
    $stmt->execute([$user_id]);
    $notifications = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    $response['notifications'] = [];
    foreach($notifications as $n) {
        $response['notifications'][] = [
            "id" => $n['id'],
            "fromId" => $n['from_id'],
            "fromName" => $n['from_name'],
            "toId" => $n['to_id'],
            "type" => $n['type'],
            "message" => $n['message'],
            "date" => $n['created_at']
        ];
    }

    echo json_encode($response);
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>