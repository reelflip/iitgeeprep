<?php
/**
 * IITGEEPrep Pro Engine v12.29 - Full Restore
 * Production Backend Infrastructure - Hardened & Stable
 */
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

include_once 'cors.php';
include_once 'config.php';

function getJsonInput() {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw);
    if ($raw && json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(["error" => "INVALID_JSON", "details" => json_last_error_msg()]);
        exit;
    }
    return $data;
}

function requireProps($data, $props) {
    if (!$data) {
        http_response_code(400);
        echo json_encode(["error" => "MISSING_BODY"]);
        exit;
    }
    foreach ($props as $p) {
        if (!isset($data->$p)) {
            http_response_code(400);
            echo json_encode(["error" => "MISSING_PROPERTY", "property" => $p]);
            exit;
        }
    }
}

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $d = getJsonInput();
    $stmt = $conn->prepare("INSERT INTO mistake_logs (id, user_id, question, subject, note, date) VALUES (?,?,?,?,?,?)");
    $stmt->execute([$d->id, $d->user_id, $d->question, $d->subject, $d->note, $d->date]);
    echo json_encode(["status" => "success"]);
}
?>