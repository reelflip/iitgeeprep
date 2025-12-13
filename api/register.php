<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->name) && !empty($data->email) && !empty($data->password)) {
    $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check->execute([$data->email]);
    if($check->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(["message" => "Email already exists"]);
        exit();
    }

    $query = "INSERT INTO users (name, email, password_hash, role, target_exam, target_year, institute, gender, dob, security_question, security_answer) VALUES (:name, :email, :pass, :role, :exam, :year, :inst, :gender, :dob, :sq, :sa)";
    $stmt = $conn->prepare($query);
    $pass = $data->password; 
    
    $stmt->bindParam(":name", $data->name);
    $stmt->bindParam(":email", $data->email);
    $stmt->bindParam(":pass", $pass);
    $stmt->bindParam(":role", $data->role);
    $stmt->bindParam(":exam", $data->targetExam);
    $stmt->bindParam(":year", $data->targetYear);
    $stmt->bindParam(":inst", $data->institute);
    $stmt->bindParam(":gender", $data->gender);
    $stmt->bindParam(":dob", $data->dob);
    $stmt->bindParam(":sq", $data->securityQuestion);
    $stmt->bindParam(":sa", $data->securityAnswer);

    if($stmt->execute()) {
        $id = $conn->lastInsertId();
        $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        unset($user['password_hash']);
        echo json_encode(["status" => "success", "user" => $user]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Registration failed"]);
    }
}
?>