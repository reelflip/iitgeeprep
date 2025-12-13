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
if($data->id) {
    $allowed_fields = ['name', 'target_exam', 'target_year', 'school', 'phone', 'avatar_url', 'notifications_json'];
    $updates = [];
    $params = [];
    foreach($data as $key => $val) {
        if(in_array($key, $allowed_fields)) {
            $updates[] = "$key = ?";
            $params[] = $val;
        }
    }
    if(!empty($updates)) {
        $params[] = $data->id;
        $sql = "UPDATE users SET " . implode(', ', $updates) . " WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute($params);
        echo json_encode(["message" => "Profile Updated"]);
    } else {
        echo json_encode(["message" => "No valid fields to update"]);
    }
}
?>