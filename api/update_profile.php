<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$data = json_decode(file_get_contents("php://input"));
if(isset($data->id)) {
    try {
        $sql = "UPDATE users SET institute = ?, school = ?, target_year = ?, target_exam = ?, phone = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            $data->institute ?? '', 
            $data->school ?? '', 
            $data->targetYear ?? 2025, 
            $data->targetExam ?? '', 
            $data->phone ?? '', 
            $data->id
        ]);
        echo json_encode(["message" => "Updated"]);
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Missing ID"]);
}
?>