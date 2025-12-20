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
$sql = "INSERT INTO user_progress (user_id, topic_id, status, last_revised, revision_level, next_revision_date, solved_questions_json) 
        VALUES (?, ?, ?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE status=VALUES(status), last_revised=VALUES(last_revised), 
        revision_level=VALUES(revision_level), next_revision_date=VALUES(next_revision_date), 
        solved_questions_json=VALUES(solved_questions_json)";
$conn->prepare($sql)->execute([$d->user_id, $d->topicId, $d->status, $d->lastRevised, $d->revisionLevel, $d->nextRevisionDate, json_encode($d->solvedQuestions)]);
echo json_encode(["status" => "success"]);
?>