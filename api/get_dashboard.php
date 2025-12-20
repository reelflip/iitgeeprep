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

$uid = $_GET['user_id'] ?? null;
if(!$uid) { echo json_encode(["error" => "Missing user_id"]); exit; }
$res = [];
$u = $conn->prepare("SELECT * FROM users WHERE id = ?"); $u->execute([$uid]); $res['userProfileSync'] = $u->fetch();
$p = $conn->prepare("SELECT * FROM user_progress WHERE user_id = ?"); $p->execute([$uid]); $res['progress'] = $p->fetchAll();
$a = $conn->prepare("SELECT * FROM test_attempts WHERE user_id = ? ORDER BY date DESC"); $a->execute([$uid]); $res['attempts'] = $a->fetchAll();
$g = $conn->prepare("SELECT * FROM goals WHERE user_id = ?"); $g->execute([$uid]); $res['goals'] = $g->fetchAll();
$b = $conn->prepare("SELECT * FROM backlogs WHERE user_id = ?"); $b->execute([$uid]); $res['backlogs'] = $b->fetchAll();
$m = $conn->prepare("SELECT * FROM mistake_logs WHERE user_id = ?"); $m->execute([$uid]); $res['mistakes'] = $m->fetchAll();
$t = $conn->prepare("SELECT * FROM timetable WHERE user_id = ?"); $t->execute([$uid]); $res['timetable'] = $t->fetch();
$ps = $conn->prepare("SELECT * FROM psychometric_results WHERE user_id = ?"); $ps->execute([$uid]); $res['psychometric'] = $ps->fetch();
$n = $conn->prepare("SELECT * FROM notifications WHERE to_id = ? ORDER BY date DESC"); $n->execute([$uid]); $res['notifications'] = $n->fetchAll();
echo json_encode($res);
?>