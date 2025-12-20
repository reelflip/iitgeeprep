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
    $conn->prepare("INSERT INTO goals (id, user_id, text, completed) VALUES (?,?,?,?)")->execute([$d->id, $d->user_id, $d->text, $d->completed?1:0]);
    echo json_encode(["status" => "success"]);
} else if($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $d = json_decode(file_get_contents('php://input'));
    $conn->prepare("UPDATE goals SET completed = ? WHERE id = ?")->execute([$d->completed?1:0, $d->id]);
    echo json_encode(["status" => "success"]);
}
?>