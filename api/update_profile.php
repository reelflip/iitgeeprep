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
    $sql = "UPDATE users SET institute = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$data->institute, $data->id]);
    echo json_encode(["message" => "Updated"]);
}
?>