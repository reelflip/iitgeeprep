<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$data = json_decode(file_get_contents('php://input'));
if(!empty($data->credential)) {
    try {
        $token = $data->credential;
        $parts = explode('.', $token);
        if(count($parts) < 2) throw new Error("Invalid Token");
        $payload = json_decode(base64_decode($parts[1]));
        $email = $payload->email;
        $name = $payload->name;
        $google_id = $payload->sub;
        $avatar = $payload->picture;
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
        $stmt->execute([$email]);
        $u = $stmt->fetch(PDO::FETCH_ASSOC);
        if($u) {
            if(empty($u['google_id'])) {
                $upd = $conn->prepare("UPDATE users SET google_id = ?, avatar_url = ? WHERE id = ?");
                $upd->execute([$google_id, $avatar, $u['id']]);
            }
            echo json_encode(["status" => "success", "user" => $u]);
        } else {
            $id = str_pad(mt_rand(100000, 999999), 6, '0', STR_PAD_LEFT);
            $role = !empty($data->role) ? $data->role : 'STUDENT';
            $ins = $conn->prepare("INSERT INTO users (id, name, email, google_id, avatar_url, role) VALUES (?, ?, ?, ?, ?, ?)");
            $ins->execute([$id, $name, $email, $google_id, $avatar, $role]);
            $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
            $stmt->execute([$id]);
            $newUser = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode(["status" => "success", "user" => $newUser]);
        }
    } catch(Exception $e) { http_response_code(500); echo json_encode(["status" => "error", "message" => $e->getMessage()]); }
}
?>