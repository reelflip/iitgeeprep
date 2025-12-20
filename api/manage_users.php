<?php
/**
 * IITGEEPrep Engine v12.43 - Command Central Core
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

$role_group = $_GET['group'] ?? 'ALL';
if($_SERVER['REQUEST_METHOD'] === 'GET') {
    if($role_group === 'ADMINS') {
        $sql = "SELECT id, name, email, role, is_verified, created_at FROM users WHERE role LIKE 'ADMIN%'";
    } else if($role_group === 'USERS') {
        $sql = "SELECT id, name, email, role, is_verified, created_at FROM users WHERE role NOT LIKE 'ADMIN%'";
    } else {
        $sql = "SELECT id, name, email, role, is_verified, created_at FROM users";
    }
    echo json_encode($conn->query($sql)->fetchAll());
} else if($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $d = getJsonInput();
    $s = $conn->prepare("UPDATE users SET is_verified = ? WHERE id = ?");
    $s->execute([getV($d, 'isVerified') ? 1 : 0, getV($d, 'id')]);
    echo json_encode(["status" => "success"]);
} else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    if($id === 'admin_root') {
        http_response_code(403);
        echo json_encode(["message" => "PROTECTED_ACCOUNT"]);
        exit;
    }
    $conn->prepare("DELETE FROM users WHERE id = ?")->execute([$id]);
    echo json_encode(["status" => "success"]);
}
?>