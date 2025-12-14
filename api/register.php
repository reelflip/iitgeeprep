<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON);

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid JSON payload"]);
    exit();
}

if(!empty($data->name) && !empty($data->email) && !empty($data->password)) {
    try {
        // Check duplicate email
        $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $check->execute([$data->email]);
        if($check->rowCount() > 0) {
            http_response_code(409);
            echo json_encode(["status" => "error", "message" => "Email already exists"]);
            exit();
        }

        // Generate ID
        $id = null;
        $attempts = 0;
        while($attempts < 5) {
            $tempId = str_pad(mt_rand(100000, 999999), 6, '0', STR_PAD_LEFT);
            $checkId = $conn->prepare("SELECT id FROM users WHERE id = ?");
            $checkId->execute([$tempId]);
            if($checkId->rowCount() == 0) {
                $id = $tempId;
                break;
            }
            $attempts++;
        }

        if(!$id) { throw new Exception("Failed to generate unique User ID"); }

        $query = "INSERT INTO users (id, name, email, password_hash, role, target_exam, target_year, institute, gender, dob, security_question, security_answer, is_verified) 
                  VALUES (:id, :name, :email, :pass, :role, :exam, :year, :inst, :gender, :dob, :sq, :sa, 1)";
        $stmt = $conn->prepare($query);
        
        $stmt->execute([
            ':id' => $id,
            ':name' => $data->name,
            ':email' => $data->email,
            ':pass' => $data->password, // Note: Production should use password_hash()
            ':role' => $data->role,
            ':exam' => $data->targetExam ?? '',
            ':year' => $data->targetYear ?? 2025,
            ':inst' => $data->institute ?? '',
            ':gender' => $data->gender ?? '',
            ':dob' => $data->dob ?? '',
            ':sq' => $data->securityQuestion ?? '',
            ':sa' => $data->securityAnswer ?? ''
        ]);

        echo json_encode([
            "status" => "success", 
            "user" => [
                "id" => $id, 
                "name" => $data->name, 
                "role" => $data->role,
                "email" => $data->email,
                "is_verified" => 1
            ]
        ]);
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "DB Error: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Missing required fields (name, email, password)"]);
}
?>