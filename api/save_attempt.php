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
$sql = "INSERT INTO test_attempts (id, user_id, test_id, title, score, total_marks, accuracy_percent, total_questions, correct_count, incorrect_count, unattempted_count, topic_id, detailed_results) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$conn->prepare($sql)->execute([$d->id, $d->user_id, $d->testId, $d->title, $d->score, $d->totalMarks, $d->accuracy_percent, $d->totalQuestions, $d->correctCount, $d->incorrectCount, $d->unattemptedCount, $d->topicId, json_encode($d->detailedResults)]);
echo json_encode(["status" => "success"]);
?>