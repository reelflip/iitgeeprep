<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';
 try { $tables = []; $res = $conn->query("SHOW TABLES"); while($row = $res->fetch(PDO::FETCH_NUM)) { $count = $conn->query("SELECT COUNT(*) FROM " . $row[0])->fetchColumn(); $tables[] = ["name" => $row[0], "rows" => $count]; } echo json_encode(["status" => "CONNECTED", "tables" => $tables]); } catch(PDOException $e) { http_response_code(500); echo json_encode(["status" => "ERROR", "message" => $e->getMessage()]); } ?>