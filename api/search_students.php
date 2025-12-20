<?php
/**
 * IITGEEPrep Pro Engine v12.27
 * Production Backend Infrastructure
 * Optimized for Hostinger/LAMP Stack
 */
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$q = $_GET['q'];
$stmt = $conn->prepare("SELECT id, name, email FROM users WHERE role = 'STUDENT' AND (id = ? OR name LIKE ?)");
$stmt->execute([$q, "%$q%"]);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>