<?php
require_once "config.php";

if (!isset($_SESSION['user_id'])) {
    jsonResponse(["success" => false, "message" => "Unauthorized"], 401);
}

$input = getInput();

$name  = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');

if ($name === '' || $email === '') {
    jsonResponse(["success" => false, "message" => "Missing fields"], 400);
}

$stmt = $conn->prepare("UPDATE users SET name = ?, email = ? WHERE id = ?");
$stmt->bind_param("ssi", $name, $email, $_SESSION['user_id']);

if ($stmt->execute()) {
    jsonResponse(["success" => true]);
} else {
    jsonResponse(["success" => false, "message" => "Update failed"], 500);
}
