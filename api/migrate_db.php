<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

// STRICT SCHEMA ENFORCEMENT
// This script ensures the database structure exactly matches the application requirements.

$schema = [
    'users' => [
        'id' => 'VARCHAR(255) PRIMARY KEY',
        'name' => 'VARCHAR(255)',
        'email' => 'VARCHAR(255)',
        'password_hash' => 'VARCHAR(255)',
        'role' => 'VARCHAR(50) DEFAULT "STUDENT"',
        'target_exam' => 'VARCHAR(100)',
        'target_year' => 'INT',
        'institute' => 'VARCHAR(255)',
        'gender' => 'VARCHAR(50)',
        'dob' => 'VARCHAR(50)',
        'security_question' => 'TEXT',
        'security_answer' => 'TEXT',
        'is_verified' => 'TINYINT(1) DEFAULT 1',
        'google_id' => 'VARCHAR(255)',
        'parent_id' => 'VARCHAR(255)',
        'linked_student_id' => 'VARCHAR(255)',
        'school' => 'VARCHAR(255)',
        'phone' => 'VARCHAR(50)',
        'avatar_url' => 'VARCHAR(500)',
        'created_at' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    'test_attempts' => [
        'id' => 'VARCHAR(255) PRIMARY KEY',
        'user_id' => 'VARCHAR(255)',
        'test_id' => 'VARCHAR(255)',
        'score' => 'INT',
        'total_marks' => 'INT',
        'accuracy' => 'FLOAT',
        'detailed_results' => 'LONGTEXT',
        'topic_id' => 'VARCHAR(255)',
        'difficulty' => 'VARCHAR(50)',
        'total_questions' => 'INT DEFAULT 0',
        'correct_count' => 'INT DEFAULT 0',
        'incorrect_count' => 'INT DEFAULT 0',
        'unattempted_count' => 'INT DEFAULT 0',
        'date' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    'user_progress' => [
        'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
        'user_id' => 'VARCHAR(255)',
        'topic_id' => 'VARCHAR(255)',
        'status' => 'VARCHAR(50)',
        'last_revised' => 'DATETIME',
        'revision_level' => 'INT',
        'next_revision_date' => 'DATETIME',
        'solved_questions_json' => 'LONGTEXT',
        'unique_constraint' => 'UNIQUE KEY (user_id, topic_id)'
    ],
    'timetable' => [
        'user_id' => 'VARCHAR(255) PRIMARY KEY',
        'config_json' => 'LONGTEXT',
        'slots_json' => 'LONGTEXT',
        'updated_at' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    'backlogs' => [
        'id' => 'VARCHAR(255) PRIMARY KEY',
        'user_id' => 'VARCHAR(255)',
        'title' => 'VARCHAR(255)',
        'subject' => 'VARCHAR(50)',
        'priority' => 'VARCHAR(50)',
        'status' => 'VARCHAR(50)',
        'deadline' => 'DATE',
        'created_at' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    'goals' => [
        'id' => 'VARCHAR(255) PRIMARY KEY',
        'user_id' => 'VARCHAR(255)',
        'text' => 'VARCHAR(255)',
        'completed' => 'TINYINT(1) DEFAULT 0',
        'created_at' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    'mistake_logs' => [
        'id' => 'VARCHAR(255) PRIMARY KEY',
        'user_id' => 'VARCHAR(255)',
        'question' => 'TEXT',
        'subject' => 'VARCHAR(50)',
        'note' => 'TEXT',
        'date' => 'DATETIME'
    ],
    'content' => [
        'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
        'type' => 'VARCHAR(50)',
        'title' => 'VARCHAR(255)',
        'content_json' => 'LONGTEXT',
        'created_at' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    'notifications' => [
        'id' => 'VARCHAR(255) PRIMARY KEY',
        'from_id' => 'VARCHAR(255)',
        'from_name' => 'VARCHAR(255)',
        'to_id' => 'VARCHAR(255)',
        'type' => 'VARCHAR(50)',
        'message' => 'TEXT',
        'created_at' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    'psychometric_results' => [
        'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
        'user_id' => 'VARCHAR(255)',
        'report_json' => 'LONGTEXT',
        'date' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        'unique_constraint' => 'UNIQUE KEY (user_id)'
    ],
    'questions' => [
        'id' => 'VARCHAR(255) PRIMARY KEY',
        'subject_id' => 'VARCHAR(50)',
        'topic_id' => 'VARCHAR(255)',
        'text' => 'TEXT',
        'options_json' => 'TEXT',
        'correct_idx' => 'INT',
        'difficulty' => 'VARCHAR(20)',
        'source' => 'VARCHAR(100)',
        'year' => 'INT'
    ],
    'tests' => [
        'id' => 'VARCHAR(255) PRIMARY KEY',
        'title' => 'VARCHAR(255)',
        'duration' => 'INT',
        'category' => 'VARCHAR(50)',
        'difficulty' => 'VARCHAR(50)',
        'exam_type' => 'VARCHAR(50)',
        'questions_json' => 'LONGTEXT',
        'created_at' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    'settings' => [
        'setting_key' => 'VARCHAR(255) PRIMARY KEY',
        'value' => 'TEXT'
    ],
    'topics' => [
        'id' => 'VARCHAR(255) PRIMARY KEY',
        'name' => 'VARCHAR(255)',
        'chapter' => 'VARCHAR(255)',
        'subject' => 'VARCHAR(50)'
    ],
    'chapter_notes' => [
        'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
        'topic_id' => 'VARCHAR(255)',
        'content_json' => 'LONGTEXT',
        'updated_at' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ],
    'video_lessons' => [
        'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
        'topic_id' => 'VARCHAR(255)',
        'url' => 'VARCHAR(500)',
        'description' => 'TEXT'
    ],
    'analytics_visits' => [
        'date' => 'DATE PRIMARY KEY',
        'count' => 'INT DEFAULT 0'
    ],
    'contact_messages' => [
        'id' => 'INT AUTO_INCREMENT PRIMARY KEY',
        'name' => 'VARCHAR(255)',
        'email' => 'VARCHAR(255)',
        'subject' => 'VARCHAR(255)',
        'message' => 'TEXT',
        'created_at' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    ]
];

try {
    foreach ($schema as $table => $columns) {
        // 1. Create Table if not exists
        $colDefs = [];
        foreach ($columns as $name => $def) {
            if ($name !== 'unique_constraint') {
                $colDefs[] = "$name $def";
            }
        }
        if (isset($columns['unique_constraint'])) {
            $colDefs[] = $columns['unique_constraint'];
        }
        
        $sql = "CREATE TABLE IF NOT EXISTS $table (" . implode(", ", $colDefs) . ")";
        $conn->exec($sql);

        // 2. Add Columns if missing (Self-Healing)
        foreach ($columns as $name => $def) {
            if ($name === 'unique_constraint') continue;
            
            try {
                // Check if column exists
                $stmt = $conn->prepare("SHOW COLUMNS FROM $table LIKE ?");
                $stmt->execute([$name]);
                
                if ($stmt->rowCount() == 0) {
                    // Column missing, add it
                    $alterSql = "ALTER TABLE $table ADD COLUMN $name $def";
                    $conn->exec($alterSql);
                }
            } catch (Exception $e) {
                // Ignore harmless errors during alter
            }
        }
    }
    
    // Explicitly add UNIQUE constraint for psychometric_results if missing (Fixes retake issues)
    try {
        $conn->exec("ALTER TABLE psychometric_results ADD UNIQUE (user_id)");
    } catch (Exception $e) { /* Ignore if exists */ }
    
    echo json_encode(["status" => "success", "message" => "Database schema synchronized successfully."]);

} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>