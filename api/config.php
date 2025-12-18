<?php
$host = "localhost";
$db_name = "u131922718_iitgeedb2";
$username = "u131922718_iitgeedb2_user";
$password = "i2ZRkC7/dR";
try {
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec("set names utf8mb4");
} catch(PDOException $exception) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database Connection Error: " . $exception.getMessage()]);
    exit();
}
?>