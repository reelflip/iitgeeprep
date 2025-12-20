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

$d = json_decode(file_get_contents('php://input'));
$sql = "INSERT INTO notifications (id, from_id, from_name, to_id, type) VALUES (?, ?, ?, ?, 'connection_request')";
$conn->prepare($sql)->execute(['req_'.time(), $d->from_id, $d->from_name, $d->to_id]);
echo json_encode(["success" => true, "message" => "Invite sent!"]);
?>