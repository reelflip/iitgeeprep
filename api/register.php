<?php
/**
 * IITGEEPrep Engine v12.38 - Master Sync Core
 * 100% Complete 38-File Backend Deployment
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

function getV($data, $p) {
    if (!$data) return null;
    if (isset($data->$p)) return $data->$p;
    $snake = strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $p));
    if (isset($data->$snake)) return $data->$snake;
    return null;
}

$d = getJsonInput();
$id = str_pad(mt_rand(1, 999999), 6, '0', STR_PAD_LEFT);
$h = password_hash(getV($d, 'password'), PASSWORD_DEFAULT);
$s = $conn->prepare("INSERT INTO users (id, name, email, password_hash, role, target_exam, target_year, phone) VALUES (?,?,?,?,?,?,?,?)");
$s->execute([$id, getV($d, 'name'), getV($d, 'email'), $h, getV($d, 'role'), getV($d, 'targetExam') ?? 'JEE Main', getV($d, 'targetYear') ?? 2025, getV($d, 'phone') ?? '']);
echo json_encode(["status" => "success", "user" => ["id" => $id, "name" => getV($d, 'name')]]);
?>