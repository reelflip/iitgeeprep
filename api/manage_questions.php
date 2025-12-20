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

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($conn->query("SELECT * FROM questions")->fetchAll(PDO::FETCH_ASSOC));
} else if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $d = json_decode(file_get_contents('php://input'));
    $conn->prepare("INSERT INTO questions (id, subject_id, topic_id, text, options_json, correct_index, source, year, difficulty) VALUES (?,?,?,?,?,?,?,?,?)")
         ->execute([$d->id, $d->subjectId, $d->topicId, $d->text, json_encode($d->options), $d->correctOptionIndex, $d->source, $d->year, $d->difficulty]);
    echo json_encode(["status" => "success"]);
}
?>