<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'config.php';

$data = json_decode(file_get_contents("php://input"));
$selectedRole = $data->role ?? null; 

if(!empty($data->token)) {
    $url = "https://oauth2.googleapis.com/tokeninfo?id_token=" . $data->token;
    $response = file_get_contents($url);
    $payload = json_decode($response);

    if($payload && isset($payload->email)) {
        $email = $payload->email;
        $name = $payload->name;
        $sub = $payload->sub;

        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if($user) {
            if(empty($user['google_id'])) {
                $upd = $conn->prepare("UPDATE users SET google_id = ? WHERE id = ?");
                $upd->execute([$sub, $user['id']]);
            }
            unset($user['password_hash']);
            echo json_encode(["status" => "success", "user" => $user]);
        } else {
            if ($selectedRole === null) {
                echo json_encode(["status" => "needs_role", "message" => "User not found, please select role"]);
                exit();
            }
            $stmt = $conn->prepare("INSERT INTO users (name, email, password_hash, role, google_id, is_verified) VALUES (?, ?, ?, ?, ?, 1)");
            $dummyPass = password_hash(uniqid(), PASSWORD_DEFAULT);
            $stmt->execute([$name, $email, $dummyPass, $selectedRole, $sub]);
            
            $id = $conn->lastInsertId();
            $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
            $stmt->execute([$id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            unset($user['password_hash']);
            echo json_encode(["status" => "success", "user" => $user]);
        }
    } else {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Invalid Google Token"]);
    }
}
?>