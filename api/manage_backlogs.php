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

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $d = json_decode(file_get_contents('php://input'));
    $conn->prepare("INSERT INTO backlogs (id, user_id, topic, subject, priority, deadline, status) VALUES (?,?,?,?,?,?,?)")
         ->execute([$d->id, $d->user_id, $d->topic, $d->subject, $d->priority, $d->deadline, $d->status]);
    echo json_encode(["status" => "success"]);
} else if($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $d = json_decode(file_get_contents('php://input'));
    $conn->prepare("UPDATE backlogs SET status = ? WHERE id = ?")->execute([$d->status, $d->id]);
    echo json_encode(["status" => "success"]);
} else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $conn->prepare("DELETE FROM backlogs WHERE id = ?")->execute([$_GET['id']]);
    echo json_encode(["status" => "success"]);
}
?>