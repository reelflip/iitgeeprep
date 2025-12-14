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

if(!empty($data->name) && !empty($data->email) && !empty($data->password)) {
    $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check->execute([$data->email]);
    if($check->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(["message" => "Email already exists"]);
        exit();
    }

    $id = uniqid('user_');
    $query = "INSERT INTO users (id, name, email, password_hash, role, target_exam, target_year, institute, gender, dob, security_question, security_answer) VALUES (:id, :name, :email, :pass, :role, :exam, :year, :inst, :gender, :dob, :sq, :sa)";
    $stmt = $conn->prepare($query);
    
    $stmt->execute([
        ':id' => $id,
        ':name' => $data->name,
        ':email' => $data->email,
        ':pass' => $data->password, // In production, use password_hash()
        ':role' => $data->role,
        ':exam' => $data->targetExam,
        ':year' => $data->targetYear,
        ':inst' => $data->institute,
        ':gender' => $data->gender,
        ':dob' => $data->dob,
        ':sq' => $data->securityQuestion,
        ':sa' => $data->securityAnswer
    ]);

    echo json_encode(["status" => "success", "user" => ["id" => $id, "name" => $data->name, "role" => $data->role]]);
}
?>