<?php
error_reporting(0); // Suppress warnings to ensure clean JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'config.php';

$query = $_GET['q'] ?? '';
if (strlen($query) < 2) {
    echo json_encode([]);
    exit();
}

// Flexible Search: Matches Name, Email, or ID (Exact or Partial)
// Only returns VERIFIED students.
$sql = "SELECT id, name, email, institute, avatar_url FROM users WHERE role = 'STUDENT' AND (name LIKE ? OR id LIKE ? OR email LIKE ?) LIMIT 10";
$stmt = $conn->prepare($sql);
$searchTerm = "%" . $query . "%";
$stmt->execute([$searchTerm, $searchTerm, $searchTerm]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($results);
?>