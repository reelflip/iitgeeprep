<?php
$host = "localhost";
$db_name = "u123456789_iitjee";
$user = "u123456789_admin";
$pass = "";
try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8mb4", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "DATABASE_CONNECTION_ERROR"]);
    exit;
}
?>