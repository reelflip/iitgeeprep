<?php
$host = "localhost";
$db_name = "u123456789_iitjee";
$user = "u123456789_admin";
$pass = "";
$conn = null;
try {
    if (!empty($host) && !empty($db_name)) {
        $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8mb4", $user, $pass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }
} catch(PDOException $e) {
    $db_error = $e->getMessage();
}
?>