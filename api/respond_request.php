<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$data = json_decode(file_get_contents('php://input'));
if(!empty($data->notification_id) && !empty($data->action)) {
    try {
        $stmt = $conn->prepare("SELECT * FROM notifications WHERE id = ?");
        $stmt->execute([$data->notification_id]);
        $notif = $stmt->fetch(PDO::FETCH_ASSOC);
        if($notif && $data->action === 'ACCEPT') {
            $conn->prepare("UPDATE users SET parent_id = ? WHERE id = ?")->execute([$notif['from_id'], $notif['to_id']]);
            $conn->prepare("UPDATE users SET linked_student_id = ? WHERE id = ?")->execute([$notif['to_id'], $notif['from_id']]);
        }
        $conn->prepare("DELETE FROM notifications WHERE id = ?")->execute([$data->notification_id]);
        echo json_encode(["success" => true]);
    } catch(Exception $e) { echo json_encode(["success" => false]); }
}
?>