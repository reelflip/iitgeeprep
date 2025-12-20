<?php
include_once 'cors.php';
include_once 'config.php';
if (!$conn) {
    echo json_encode(["status" => "ERROR", "message" => "DATABASE_CONNECTION_ERROR", "details" => $db_error ?? "Unknown"]);
    exit;
}
try {
    $tables = [];
    $res = $conn->query("SHOW TABLES");
    while($row = $res->fetch(PDO::FETCH_NUM)) {
        $count = $conn->query("SELECT count(*) FROM `$row[0]`")->fetchColumn();
        $tables[] = ["name" => $row[0], "rows" => (int)$count];
    }
    echo json_encode(["status" => "CONNECTED", "tables" => $tables]);
} catch(Exception $e) { 
    echo json_encode(["status" => "ERROR", "message" => $e->getMessage()]); 
}?>