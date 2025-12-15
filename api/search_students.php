<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';
 try { $query = $_GET['q'] ?? ''; if (strlen($query) < 2) { echo json_encode([]); exit(); } $sql = "SELECT id, name, email, institute FROM users WHERE role = 'STUDENT' AND (name LIKE ? OR id LIKE ? OR email LIKE ?) LIMIT 10"; $stmt = $conn->prepare($sql); $searchTerm = "%" . $query . "%"; $stmt->execute([$searchTerm, $searchTerm, $searchTerm]); echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC)); } catch (Exception $e) { http_response_code(500); echo json_encode(["error" => $e->getMessage()]); } ?>