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

$data = getJsonInput();
$email = $data->email ?? 'social_user@gmail.local'; 
$name = $data->name ?? 'Social User';
$role = $data->role ?? 'STUDENT';
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$u = $stmt->fetch();
if(!$u) {
    $id = str_pad(mt_rand(1, 999999), 6, '0', STR_PAD_LEFT);
    $conn->prepare("INSERT INTO users (id, name, email, role) VALUES (?, ?, ?, ?)")->execute([$id, $name, $email, $role]);
    $stmt->execute([$email]);
    $u = $stmt->fetch();
}
echo json_encode(["status" => "success", "user" => $u, "version" => "12.35"]);
?>