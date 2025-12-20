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

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($conn->query("SELECT id, name, email, role, is_verified FROM users")->fetchAll());
} else if($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $d = getJsonInput();
    requireProps($d, ['id', 'isVerified']);
    $stmt = $conn->prepare("UPDATE users SET is_verified = ? WHERE id = ?");
    $stmt->execute([$d->isVerified ? 1 : 0, $d->id]);
    echo json_encode(["status" => "success"]);
} else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$_GET['id']]);
    echo json_encode(["status" => "success"]);
}
?>