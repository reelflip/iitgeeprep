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

try {
    $tables = [];
    $stmt = $conn->query("SHOW TABLES");
    while($row = $stmt->fetch(PDO::FETCH_NUM)) {
        $count = $conn->query("SELECT count(*) FROM `$row[0]`")->fetchColumn();
        $tables[] = ["name" => $row[0], "rows" => $count];
    }
    echo json_encode(["status" => "CONNECTED", "db_name" => $db_name, "tables" => $tables]);
} catch(Exception $e) { 
    echo json_encode(["status" => "error", "message" => $e->getMessage()]); 
}
?>