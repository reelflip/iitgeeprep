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
$stmt = $conn->prepare("UPDATE users SET school=?, target_year=?, target_exam=?, phone=? WHERE id=?");
$stmt->execute([$d->school, $d->targetYear, $d->targetExam, $d->phone, $d->id]);
echo json_encode(["status" => "success"]);
?>