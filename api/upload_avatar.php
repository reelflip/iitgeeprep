<?php
require_once "config.php";

if (!isset($_SESSION['user_id'])) {
    jsonResponse(["success" => false], 401);
}

if (!isset($_FILES['avatar'])) {
    jsonResponse(["success" => false, "message" => "No file"], 400);
}

$dir = "../uploads/avatars/";
if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

$ext = pathinfo($_FILES['avatar']['name'], PATHINFO_EXTENSION);
$filename = "u_" . $_SESSION['user_id'] . "." . $ext;
$path = $dir . $filename;

if (!move_uploaded_file($_FILES['avatar']['tmp_name'], $path)) {
    jsonResponse(["success" => false], 500);
}

$stmt = $conn->prepare("UPDATE users SET avatar = ? WHERE id = ?");
$stmt->bind_param("si", $filename, $_SESSION['user_id']);
$stmt->execute();

jsonResponse(["success" => true, "avatar" => $filename]);
