<?php
$host = "localhost";
$db_name = "u131922718_iitgeedb2";
$user = "u131922718_iitgeedb2_user";
$pass = "lU5/8@e~fy";

$conn = null;
$db_error = null;

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    $db_error = $e->getMessage();
}
?>
