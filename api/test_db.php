<?php
/**
 * IITGEEPrep Pro Engine v12.35 - Persistence Core
 * Full Production Backend Suite - Zero Partial Updates
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

try {
    $tables = [];
    $stmt = $conn->query("SHOW TABLES");
    while($row = $stmt->fetch(PDO::FETCH_NUM)) {
        $tableName = $row[0];
        $count = $conn->query("SELECT count(*) FROM `$tableName`")->fetchColumn();
        $colStmt = $conn->query("DESCRIBE `$tableName`");
        $cols = $colStmt->fetchAll();
        $tables[] = [
            "name" => $tableName, 
            "rows" => $count,
            "columns" => array_map(function($c) { 
                return ["name" => $c['Field'], "type" => $c['Type'], "null" => $c['Null'], "key" => $c['Key']]; 
            }, $cols)
        ];
    }
    echo json_encode(["status" => "CONNECTED", "db_name" => $db_name, "tables" => $tables, "version" => "12.35"]);
} catch(Exception $e) { 
    echo json_encode(["status" => "error", "message" => $e->getMessage()]); 
}
?>