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

$user_id = $_GET['user_id'];
$resp = [];
$resp['userProfileSync'] = $conn->query("SELECT * FROM users WHERE id = '$user_id'")->fetch(PDO::FETCH_ASSOC);
$resp['progress'] = $conn->query("SELECT * FROM user_progress WHERE user_id = '$user_id'")->fetchAll(PDO::FETCH_ASSOC);
$resp['attempts'] = $conn->query("SELECT * FROM test_attempts WHERE user_id = '$user_id' ORDER BY date DESC")->fetchAll(PDO::FETCH_ASSOC);
$resp['goals'] = $conn->query("SELECT * FROM goals WHERE user_id = '$user_id'")->fetchAll(PDO::FETCH_ASSOC);
$resp['backlogs'] = $conn->query("SELECT * FROM backlogs WHERE user_id = '$user_id'")->fetchAll(PDO::FETCH_ASSOC);
$resp['notifications'] = $conn->query("SELECT * FROM notifications WHERE to_id = '$user_id' ORDER BY date DESC")->fetchAll(PDO::FETCH_ASSOC);
$resp['timetable'] = $conn->query("SELECT * FROM timetable WHERE user_id = '$user_id'")->fetch(PDO::FETCH_ASSOC);
echo json_encode($resp);
?>