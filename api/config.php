<?php
$host = "localhost";
$db_name = "u123456789_prep";
$user = "u123456789_admin";
$pass = "password";

$conn = null;
$db_error = null;

try {
    // REVERTED TO MYSQL (Hostinger Standard)
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    $db_error = $e->getMessage();
}
?>