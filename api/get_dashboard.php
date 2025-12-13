<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

$user_id = $_GET['user_id'] ?? null;
if(!$user_id) { echo json_encode([]); exit(); }

$stmt = $conn->prepare("SELECT * FROM topic_progress WHERE user_id = ?");
$stmt->execute([$user_id]);
$progress = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Updated to fetch more attempts and include details for Analytics
$stmt = $conn->prepare("SELECT * FROM test_attempts WHERE user_id = ? ORDER BY date DESC LIMIT 50");
$stmt->execute([$user_id]);
$attempts = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach($attempts as &$attempt) {
    $dStmt = $conn->prepare("SELECT * FROM attempt_details WHERE attempt_id = ?");
    $dStmt->execute([$attempt['id']]);
    $details = $dStmt->fetchAll(PDO::FETCH_ASSOC);
    
    $detailedResults = [];
    foreach($details as $d) {
        // Fetch Question Metadata for subject/topic info
        $qStmt = $conn->prepare("SELECT subject_id, topic_id FROM questions WHERE id = ?");
        $qStmt->execute([$d['question_id']]);
        $qData = $qStmt->fetch(PDO::FETCH_ASSOC);
        
        if($qData) {
            $detailedResults[] = [
                "questionId" => $d['question_id'],
                "subjectId" => $qData['subject_id'],
                "topicId" => $qData['topic_id'],
                "status" => $d['status'],
                "selectedOptionIndex" => $d['selected_option']
            ];
        }
    }
    $attempt['detailedResults'] = $detailedResults;
}

$stmt = $conn->prepare("SELECT * FROM goals WHERE user_id = ? AND date(created_at) = CURDATE()");
$stmt->execute([$user_id]);
$goals = $stmt->fetchAll(PDO::FETCH_ASSOC);

$stmt = $conn->prepare("SELECT * FROM timetable_configs WHERE user_id = ?");
$stmt->execute([$user_id]);
$timetable = $stmt->fetch(PDO::FETCH_ASSOC);
if($timetable) {
    $timetable['config'] = json_decode($timetable['config_json']);
    $timetable['slots'] = json_decode($timetable['slots_json']);
    unset($timetable['config_json']);
    unset($timetable['slots_json']);
}

$stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$user_id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
unset($user['password_hash']);

echo json_encode([
    "progress" => $progress,
    "attempts" => $attempts,
    "goals" => $goals,
    "timetable" => $timetable,
    "userProfileSync" => $user
]);
?>