<?php
$host = "localhost";
$db_name = "u131922718_iitgeedb2";
$username = "u131922718_iitgeedb2_user";
$password = "i2ZRkC7/dR";
try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8mb4", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "DB_CONNECTION_FAILED", "details" => $e->getMessage()]); exit;
}
?>
