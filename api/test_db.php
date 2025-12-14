<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'config.php';

try {
    // 1. Table Stats
    $tables = [];
    $res = $conn->query("SHOW TABLES");
    while($row = $res->fetch(PDO::FETCH_NUM)) {
        $count = $conn->query("SELECT COUNT(*) FROM " . $row[0])->fetchColumn();
        $tables[] = ["name" => $row[0], "rows" => $count];
    }

    // 2. Content Stats (Topics with Questions/Notes)
    $contentStats = [];
    
    // Check if topics table exists first to avoid error on fresh DB
    $check = $conn->query("SHOW TABLES LIKE 'topics'");
    if($check->rowCount() > 0) {
        $sql = "SELECT 
            t.name as topic, 
            t.subject, 
            (SELECT COUNT(*) FROM questions q WHERE q.topic_id = t.id) as question_count,
            (SELECT COUNT(*) FROM chapter_notes n WHERE n.topic_id = t.id) as note_count
        FROM topics t
        HAVING question_count > 0 OR note_count > 0";
        $contentStats = $conn->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode([
        "status" => "CONNECTED",
        "db_host" => $host,
        "db_name" => $db_name,
        "server_info" => $conn->getAttribute(PDO::ATTR_SERVER_VERSION),
        "tables" => $tables,
        "content_stats" => $contentStats
    ]);

} catch(PDOException $e) {
    echo json_encode(["status" => "ERROR", "message" => $e->getMessage()]);
}
?>