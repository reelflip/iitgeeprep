<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$data = json_decode(file_get_contents('php://input'));
if(!empty($data->email) && !empty($data->password)) {
    try {
        $id = str_pad(mt_rand(100000, 999999), 6, '0', STR_PAD_LEFT);
        $sql = "INSERT INTO users (id, name, email, password_hash, role, institute, target_exam, target_year, dob, gender, security_question, security_answer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            $id, 
            $data->name, 
            $data->email, 
            $data->password, 
            $data->role,
            $data->institute ?? null,
            $data->targetExam ?? null,
            $data->targetYear ?? 2025,
            $data->dob ?? null,
            $data->gender ?? null,
            $data->securityQuestion ?? null,
            $data->securityAnswer ?? null
        ]);
        echo json_encode(["status" => "success", "user" => ["id" => $id, "name" => $data->name, "role" => $data->role, "email" => $data->email]]);
    } catch(Exception $e) { http_response_code(500); echo json_encode(["error" => "Registration failed. Email may exist."]); }
}
?>