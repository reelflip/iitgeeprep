<?php
/**
 * IITGEEPrep Engine v12.43 - Command Central Core
 * 100% Complete 38-File Backend Deployment
 */
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

include_once 'cors.php';
include_once 'config.php';

function getJsonInput() {
    $raw = file_get_contents('php://input');
    if (!$raw) return null;
    $data = json_decode($raw);
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(["error" => "INVALID_JSON", "details" => json_last_error_msg()]);
        exit;
    }
    return $data;
}

function getV($data, $p) {
    if (!$data) return null;
    if (isset($data->$p)) return $data->$p;
    $snake = strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $p));
    if (isset($data->$snake)) return $data->$snake;
    return null;
}

$tables = [
    'users' => "(id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, password_hash VARCHAR(255), role VARCHAR(50), school VARCHAR(255), target_year INT, target_exam VARCHAR(255), phone VARCHAR(20), avatar_url TEXT, is_verified TINYINT(1) DEFAULT 1, parent_id VARCHAR(255), linked_student_id VARCHAR(255), dob DATE, gender VARCHAR(20), google_id VARCHAR(255), security_question TEXT, security_answer TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'user_progress' => "(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), topic_id VARCHAR(255), status VARCHAR(50), last_revised TIMESTAMP NULL, revision_level INT DEFAULT 0, next_revision_date TIMESTAMP NULL, solved_questions_json TEXT, ex1_solved INT, ex1_total INT, UNIQUE KEY user_topic (user_id, topic_id))",
    'topic_progress' => "(user_id VARCHAR(255), topic_id VARCHAR(255), progress_pct INT, PRIMARY KEY(user_id, topic_id))",
    'test_attempts' => "(id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), test_id VARCHAR(255), title VARCHAR(255), score INT, total_marks INT, accuracy INT, total_questions INT, correct_count INT, incorrect_count INT, unattempted_count INT, topic_id VARCHAR(255), difficulty VARCHAR(50), detailed_results LONGTEXT, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'attempt_details' => "(id INT AUTO_INCREMENT PRIMARY KEY, attempt_id VARCHAR(255), question_id VARCHAR(255), status VARCHAR(20), selected_option INT)",
    'timetable' => "(user_id VARCHAR(255) PRIMARY KEY, config_json LONGTEXT, slots_json LONGTEXT, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)",
    'timetable_configs' => "(user_id VARCHAR(255) PRIMARY KEY, config_json LONGTEXT)",
    'sync_status' => "(user_id VARCHAR(255), section VARCHAR(50), is_synced TINYINT(1) DEFAULT 1, last_sync TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(user_id, section))",
    'goals' => "(id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), text TEXT, completed TINYINT(1) DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'backlogs' => "(id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), title VARCHAR(255), subject VARCHAR(50), subject_id VARCHAR(50), priority VARCHAR(20), status VARCHAR(20), deadline DATE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'mistake_logs' => "(id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), question TEXT, subject VARCHAR(50), note TEXT, date TIMESTAMP)",
    'mistakes' => "(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), data_json TEXT)",
    'psychometric_results' => "(id VARCHAR(255), user_id VARCHAR(255) PRIMARY KEY, report_json LONGTEXT, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'notifications' => "(id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255), from_id VARCHAR(255), from_name VARCHAR(255), to_id VARCHAR(255), type VARCHAR(50), message TEXT, is_read TINYINT(1) DEFAULT 0, date TIMESTAMP, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'settings' => "(setting_key VARCHAR(255) PRIMARY KEY, value TEXT)",
    'system_settings' => "(setting_key VARCHAR(255) PRIMARY KEY, setting_value TEXT)",
    'analytics_visits' => "(date DATE PRIMARY KEY, count INT DEFAULT 0)",
    'questions' => "(id VARCHAR(255) PRIMARY KEY, subject_id VARCHAR(50), topic_id VARCHAR(255), text TEXT, options_json TEXT, correct_idx INT, source VARCHAR(255), year VARCHAR(10), difficulty VARCHAR(20))",
    'topics' => "(id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), chapter VARCHAR(255), subject VARCHAR(50))",
    'tests' => "(id VARCHAR(255) PRIMARY KEY, title VARCHAR(255), duration INT, questions_json LONGTEXT, category VARCHAR(50), difficulty VARCHAR(50), exam_type VARCHAR(50), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'chapter_notes' => "(id INT AUTO_INCREMENT PRIMARY KEY, topic_id VARCHAR(255), content_json LONGTEXT, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)",
    'video_lessons' => "(id INT AUTO_INCREMENT PRIMARY KEY, topic_id VARCHAR(255), url TEXT, description TEXT)",
    'videos' => "(id INT AUTO_INCREMENT PRIMARY KEY, topic_id VARCHAR(255), data_json TEXT)",
    'contact_messages' => "(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), subject VARCHAR(255), message TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'flashcards' => "(id INT AUTO_INCREMENT PRIMARY KEY, front TEXT, back TEXT, subject_id VARCHAR(50))",
    'memory_hacks' => "(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, trick TEXT, tag VARCHAR(50), subject_id VARCHAR(50))",
    'blog_posts' => "(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), excerpt TEXT, content LONGTEXT, author VARCHAR(255), image_url TEXT, category VARCHAR(50), date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
    'content' => "(id INT AUTO_INCREMENT PRIMARY KEY, type VARCHAR(50), title VARCHAR(255), content_json LONGTEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
];
foreach($tables as $name => $def) { $conn->exec("CREATE TABLE IF NOT EXISTS $name $def ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"); }

$check = $conn->query("SELECT count(*) FROM topics")->fetchColumn();
if($check == 0) {
    $conn->exec("INSERT INTO topics (id, name, chapter, subject) VALUES ('p-units', 'Units & Dimensions', 'Units and Measurements', 'Physics')");
    $conn->exec("INSERT INTO questions (id, subject_id, topic_id, text, options_json, correct_idx, source, year, difficulty) VALUES ('q_p_units_1', 'phys', 'p-units', 'Dim of Planck Constant?', '["[ML2T-1]","[ML2T-2]","[MLT-1]","[MLT-2]"]', 0, 'Seed', '2024', 'EASY')");
    $conn->exec("INSERT INTO tests (id, title, duration, questions_json, category, difficulty) VALUES ('test_seed_1', 'Initial Diagnostic', 180, '["q_p_units_1"]', 'ADMIN', 'MAINS')");
}

echo json_encode(["status" => "success", "message" => "Master Schema v12.43 Integrated", "tables_created" => count($tables)]);
?>