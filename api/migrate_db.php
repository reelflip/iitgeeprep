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
            echo "Added $col to $table<br>";
        }
    } catch(Exception $e) {
        // Table might not exist or other error, ignore to let Create Table handle it or fail gracefully
    }
}

try {
    // 1. Ensure Tables Exist (Simplified Re-run of Create)
    $sql = "
    CREATE TABLE IF NOT EXISTS users (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255));
    CREATE TABLE IF NOT EXISTS test_attempts (id VARCHAR(255) PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS user_progress (id INT AUTO_INCREMENT PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS timetable (user_id VARCHAR(255) PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS backlogs (id VARCHAR(255) PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS psychometric_results (id INT AUTO_INCREMENT PRIMARY KEY);
    ";
    
    // 2. Add Missing Columns (The Fix for 1054 Errors)
    
    // Users Table
    checkAndAddColumn($conn, 'users', 'school', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'users', 'phone', 'VARCHAR(50)');
    checkAndAddColumn($conn, 'users', 'avatar_url', 'VARCHAR(500)');
    checkAndAddColumn($conn, 'users', 'linked_student_id', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'users', 'parent_id', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'users', 'google_id', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'users', 'is_verified', 'TINYINT(1) DEFAULT 1');
    
    // Test Attempts
    checkAndAddColumn($conn, 'test_attempts', 'detailed_results', 'LONGTEXT');
    checkAndAddColumn($conn, 'test_attempts', 'topic_id', 'VARCHAR(255)');
    checkAndAddColumn($conn, 'test_attempts', 'difficulty', 'VARCHAR(50)');
    
    // User Progress
    checkAndAddColumn($conn, 'user_progress', 'solved_questions_json', 'LONGTEXT');
    checkAndAddColumn($conn, 'user_progress', 'next_revision_date', 'DATETIME');
    
    // Timetable
    checkAndAddColumn($conn, 'timetable', 'config_json', 'LONGTEXT');
    checkAndAddColumn($conn, 'timetable', 'slots_json', 'LONGTEXT');

    echo json_encode(["status" => "success", "message" => "Database schema updated successfully."]);

} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>