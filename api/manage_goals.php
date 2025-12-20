<?php
/**
 * IITGEEPrep Pro Engine v12.35 - Persistence Core
 * Full Production Backend Suite - Zero Partial Updates
 */
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

include_once 'cors.php';
include_once 'config.php';

function getJsonInput() {
    $raw = file_get_contents('php://input');
    if (!$raw) return null;
    $data = json_decode($raw);
    if (json_last_error() !== JSON_ERROR_NONE) {
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

$d = getJsonInput();
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $conn->prepare("INSERT INTO goals (id, user_id, text, completed) VALUES (?,?,?,?)");
    $stmt->execute([$d->id, $d->user_id, $d->text, 0]);
    echo json_encode(["status" => "success"]);
} else if($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $stmt = $conn->prepare("UPDATE goals SET completed = ? WHERE id = ?");
    $stmt->execute([$d->completed ? 1 : 0, $d->id]);
    echo json_encode(["status" => "success"]);
}
?>