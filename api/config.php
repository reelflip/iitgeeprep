<?php
$host = "localhost";
$db_name = "u123456789_iitjee";
$username = "u123456789_admin";
$password = "";

try {
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec("set names utf8mb4");
} catch(PDOException $exception) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database Connection Error: " . $exception->getMessage()]);
    exit();
}
?>