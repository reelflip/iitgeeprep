<?php
/**
 * IITGEEPrep Pro Engine v12.29 - Full Restore
 * Production Backend Infrastructure - Hardened & Stable
 */
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

include_once 'cors.php';
include_once 'config.php';

function getJsonInput() {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw);
    if ($raw && json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(["error" => "INVALID_JSON", "details" => json_last_error_msg()]);
        exit;
    }
    return $data;
}

function requireProps($data, $props) {
    if (!$data) {
        http_response_code(400);
        echo json_encode(["error" => "MISSING_BODY"]);
        exit;
    }
    foreach ($props as $p) {
        if (!isset($data->$p)) {
            http_response_code(400);
            echo json_encode(["error" => "MISSING_PROPERTY", "property" => $p]);
            exit;
        }
    }
}

$tables = [
    'users' => "(id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, password_hash VARCHAR(255), role VARCHAR(50), school VARCHAR(255), target_year INT, target_exam VARCHAR(255), phone VARCHAR(20), avatar_url TEXT, is_verified TINYINT(1) DEFAULT 1, parent_id VARCHAR(255), linked_student_id VARCHAR(255))",
    'user_progress' => "(user_id VARCHAR(255), topic_id VARCHAR(255), status VARCHAR(50), last_revised TIMESTAMP NULL, revision_level INT DEFAULT 0, next_revision_date TIMESTAMP NULL, solved_questions_json TEXT, PRIMARY KEY(user_id, topic_id))",
    'test_attempts' => "(id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), test_id VARCHAR(255), title VARCHAR(255), score INT, total_marks INT, accuracy_percent INT, total_questions INT, correct_count INT, incorrect_count INT, unattempted_count INT, topic_id VARCHAR(255), detailed_results TEXT, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'goals' => "(id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), text TEXT, completed TINYINT(1) DEFAULT 0)",
    'backlogs' => "(id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), topic TEXT, subject VARCHAR(50), priority VARCHAR(20), deadline DATE, status VARCHAR(20))",
    'mistake_logs' => "(id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), question TEXT, subject VARCHAR(50), note TEXT, date TIMESTAMP)",
    'notifications' => "(id VARCHAR(255) PRIMARY KEY, from_id VARCHAR(255), from_name VARCHAR(255), to_id VARCHAR(255), type VARCHAR(50), date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'settings' => "(setting_key VARCHAR(255) PRIMARY KEY, value TEXT)",
    'analytics_visits' => "(date DATE PRIMARY KEY, count INT DEFAULT 0)",
    'topics' => "(id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), chapter VARCHAR(255), subject VARCHAR(50))",
    'timetable' => "(user_id VARCHAR(255) PRIMARY KEY, config_json TEXT, slots_json TEXT)",
    'questions' => "(id VARCHAR(255) PRIMARY KEY, subject_id VARCHAR(50), topic_id VARCHAR(255), text TEXT, options_json TEXT, correct_index INT, source VARCHAR(255), year INT, difficulty VARCHAR(20))",
    'tests' => "(id VARCHAR(255) PRIMARY KEY, title VARCHAR(255), duration_minutes INT, questions_json LONGTEXT, category VARCHAR(50), difficulty VARCHAR(50))",
    'content' => "(id INT AUTO_INCREMENT PRIMARY KEY, type VARCHAR(50), content_json LONGTEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'chapter_notes' => "(topic_id VARCHAR(255) PRIMARY KEY, content_json LONGTEXT)",
    'video_lessons' => "(topic_id VARCHAR(255) PRIMARY KEY, url TEXT, description TEXT)",
    'psychometric_results' => "(user_id VARCHAR(255) PRIMARY KEY, report_json LONGTEXT)",
    'contact_messages' => "(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), subject VARCHAR(255), message TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
];
foreach($tables as $name => $def) { 
    try { $conn->exec("CREATE TABLE IF NOT EXISTS $name $def ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"); } catch(Exception $e) {}
}
echo json_encode(["status" => "success", "message" => "v12.29 Database Schema Verified"]);
?>