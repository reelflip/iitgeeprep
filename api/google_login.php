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
// Basic Mock Google Login implementation for deployment structure
// In production, validate ID token with Google API
if (!empty($data->token)) {
    // Check if user exists by some ID mechanism or email embedded in token (mock logic)
    // Here we assume successful decode
    $email = "user@gmail.com"; // Mock extracted email
    $google_id = substr($data->token, 0, 20); 
    
    $stmt = $conn->prepare("SELECT * FROM users WHERE google_id = ? OR email = ? LIMIT 1");
    $stmt->execute([$google_id, $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        unset($user['password_hash']);
        echo json_encode(["status" => "success", "user" => $user]);
    } else {
        // New user logic
        if (!empty($data->role)) {
             $id = uniqid('user_');
             $stmt = $conn->prepare("INSERT INTO users (id, name, email, role, google_id, is_verified) VALUES (?, ?, ?, ?, ?, 1)");
             $stmt->execute([$id, "Google User", $email, $data->role, $google_id]);
             echo json_encode(["status" => "success", "user" => ["id" => $id, "name" => "Google User", "role" => $data->role]]);
        } else {
             echo json_encode(["status" => "needs_role"]);
        }
    }
}
?>