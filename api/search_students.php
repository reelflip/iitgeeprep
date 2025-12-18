<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$q = $_GET['q'] ?? '';
if(!$q) exit(json_encode([]));
try {
    $stmt = $conn->prepare("SELECT id, name FROM users WHERE role = 'STUDENT' AND (id = ? OR name LIKE ?)");
    $stmt->execute([$q, "%$q%"]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch(Exception $e) { echo json_encode([]); }
?>