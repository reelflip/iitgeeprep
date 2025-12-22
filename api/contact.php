<?php
require_once "config.php";

$input = getInput();

$name    = trim($input['name'] ?? '');
$email   = trim($input['email'] ?? '');
$message = trim($input['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    jsonResponse(["success" => false, "message" => "All fields required"], 400);
}

$stmt = $conn->prepare(
    "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)"
);
$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {
    jsonResponse(["success" => true]);
} else {
    jsonResponse(["success" => false], 500);
}
