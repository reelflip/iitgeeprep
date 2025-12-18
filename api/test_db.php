<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

try {
    $tables = [];
    $res = $conn->query("SHOW TABLES");
    while($row = $res->fetch(PDO::FETCH_NUM)) {
        $tableName = $row[0];
        
        // Count Columns
        $colStmt = $conn->prepare("SELECT COUNT(*) FROM information_schema.columns WHERE table_name = ? AND table_schema = ?");
        $colStmt->execute([$tableName, $db_name]);
        $colCount = $colStmt->fetchColumn();
        
        // Count Rows
        $rowCount = $conn->query("SELECT COUNT(*) FROM $tableName")->fetchColumn();
        
        $tables[] = [
            "name" => $tableName, 
            "columns" => (int)$colCount, 
            "rows" => (int)$rowCount
        ];
    }
    echo json_encode(["status" => "CONNECTED", "db_name" => $db_name, "tables" => $tables]);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "ERROR", "message" => $e->getMessage()]);
}
?>