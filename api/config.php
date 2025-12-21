<?php
$host = "localhost";
$db_name = "u123456789_prep";
$user = "u123456789_admin";
$pass = "password";
try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    http_response_code(500);
    die(json_encode(["status" => "error", "message" => "DB_CONNECTION_FAILED: " . $e->getMessage()]));
}
?>