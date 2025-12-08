<?php
$host = "localhost";
$db_name = "u131922718_iitgeedb2";
$username = "u131922718_iitgeedb2_user";
$password = "J$9mWPRaTs3s";

try {
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec("set names utf8");
} catch(PDOException $exception) {
    echo json_encode(["error" => "Connection error: " . $exception->getMessage()]);
    exit();
}
?>
