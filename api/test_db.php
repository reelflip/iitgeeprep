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

try {
    $tables = [];
    $res = $conn->query("SHOW TABLES");
    while($row = $res->fetch(PDO::FETCH_NUM)) {
        $count = $conn->query("SELECT COUNT(*) FROM " . $row[0])->fetchColumn();
        $tables[] = ["name" => $row[0], "rows" => $count];
    }
    echo json_encode([
        "status" => "CONNECTED",
        "db_host" => $host,
        "db_name" => $db_name,
        "server_info" => $conn->getAttribute(PDO::ATTR_SERVER_INFO),
        "tables" => $tables
    ]);
} catch(Exception $e) {
    echo json_encode(["status" => "ERROR", "message" => $e->getMessage()]);
}
?>