<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

// Helper to safely add columns if they don't exist
function checkAndAddColumn($conn, $table, $col, $def) {
    try {
        $stmt = $conn->prepare("SHOW COLUMNS FROM $table LIKE ?");
        $stmt->execute([$col]);
        if ($stmt->rowCount() == 0) {
            $conn->exec("ALTER TABLE $table ADD COLUMN $col $def");
        }
    } catch(Exception $e) {
        // Table might not exist or other error
    }
}

try {
    // 1. Ensure Base Tables Exist (Simplified Re-run of Create)
    $sql = "
    CREATE TABLE IF NOT EXISTS users (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255));
    CREATE TABLE IF NOT EXISTS test_attempts (id VARCHAR(255) PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS user_progress (id INT AUTO_INCREMENT PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS timetable (user_id VARCHAR(255) PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS backlogs (id VARCHAR(255) PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS goals (id VARCHAR(255) PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS mistake_logs (id VARCHAR(255) PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS content (id INT AUTO_INCREMENT PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS notifications (id VARCHAR(255) PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS psychometric_results (id INT AUTO_INCREMENT PRIMARY KEY);
    ";
    $conn->exec($sql);
    
    // 2. Add Missing Columns (Comprehensive Check for 1054 Errors)
    
    // Users Table
    checkAndAddColumn($conn, 'users', 'school', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'users', 'phone', 'VARCHAR(50)');
    checkAndAddColumn($conn, 'users', 'avatar_url', 'VARCHAR(500)');
    checkAndAddColumn($conn, 'users', 'linked_student_id', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'users', 'parent_id', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'users', 'google_id', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'users', 'is_verified', 'TINYINT(1) DEFAULT 1');
    checkAndAddColumn($conn, 'users', 'target_exam', 'VARCHAR(100)');
    checkAndAddColumn($conn, 'users', 'target_year', 'INT');
    checkAndAddColumn($conn, 'users', 'institute', 'VARCHAR(255)');
    
    // Test Attempts
    checkAndAddColumn($conn, 'test_attempts', 'detailed_results', 'LONGTEXT');
    checkAndAddColumn($conn, 'test_attempts', 'topic_id', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'test_attempts', 'difficulty', 'VARCHAR(50)');
    checkAndAddColumn($conn, 'test_attempts', 'accuracy', 'FLOAT');
    checkAndAddColumn($conn, 'test_attempts', 'total_marks', 'INT');
    checkAndAddColumn($conn, 'test_attempts', 'user_id', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'test_attempts', 'test_id', 'VARCHAR(255)');
    
    // User Progress
    checkAndAddColumn($conn, 'user_progress', 'solved_questions_json', 'LONGTEXT');
    checkAndAddColumn($conn, 'user_progress', 'next_revision_date', 'DATETIME');
    checkAndAddColumn($conn, 'user_progress', 'status', 'VARCHAR(50)');
    checkAndAddColumn($conn, 'user_progress', 'last_revised', 'DATETIME');
    checkAndAddColumn($conn, 'user_progress', 'revision_level', 'INT');
    
    // Timetable
    checkAndAddColumn($conn, 'timetable', 'config_json', 'LONGTEXT');
    checkAndAddColumn($conn, 'timetable', 'slots_json', 'LONGTEXT');
    
    // Backlogs
    checkAndAddColumn($conn, 'backlogs', 'user_id', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'backlogs', 'title', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'backlogs', 'subject', 'VARCHAR(50)');
    checkAndAddColumn($conn, 'backlogs', 'priority', 'VARCHAR(50)');
    checkAndAddColumn($conn, 'backlogs', 'status', 'VARCHAR(50)');
    checkAndAddColumn($conn, 'backlogs', 'deadline', 'DATE');
    
    // Goals
    checkAndAddColumn($conn, 'goals', 'user_id', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'goals', 'text', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'goals', 'completed', 'TINYINT(1) DEFAULT 0');
    
    // Mistake Logs
    checkAndAddColumn($conn, 'mistake_logs', 'user_id', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'mistake_logs', 'question', 'TEXT');
    checkAndAddColumn($conn, 'mistake_logs', 'subject', 'VARCHAR(50)');
    checkAndAddColumn($conn, 'mistake_logs', 'note', 'TEXT');
    checkAndAddColumn($conn, 'mistake_logs', 'date', 'DATETIME');
    
    // Content (Flashcards/Hacks)
    checkAndAddColumn($conn, 'content', 'type', 'VARCHAR(50)');
    checkAndAddColumn($conn, 'content', 'title', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'content', 'content_json', 'LONGTEXT');
    
    // Notifications
    checkAndAddColumn($conn, 'notifications', 'from_id', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'notifications', 'from_name', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'notifications', 'to_id', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'notifications', 'type', 'VARCHAR(50)');
    checkAndAddColumn($conn, 'notifications', 'message', 'TEXT');

    echo json_encode(["status" => "success", "message" => "Database schema verified and updated successfully."]);

} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>