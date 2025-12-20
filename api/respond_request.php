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
if($d->action === 'ACCEPT') {
    $req = $conn->query("SELECT * FROM notifications WHERE id = '$d->notification_id'")->fetch(PDO::FETCH_ASSOC);
    if($req) {
        $conn->prepare("UPDATE users SET parent_id = ? WHERE id = ?")->execute([$req['from_id'], $req['to_id']]);
        $conn->prepare("UPDATE users SET linked_student_id = ? WHERE id = ?")->execute([$req['to_id'], $req['from_id']]);
    }
}
$conn->prepare("DELETE FROM notifications WHERE id = ?")->execute([$d->notification_id]);
echo json_encode(["status" => "success"]);
?>