<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';
 $data = json_decode(file_get_contents("php://input")); try { if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['user_id'])) { $stmt = $conn->prepare("SELECT * FROM mistake_logs WHERE user_id = ? ORDER BY date DESC"); $stmt->execute([$_GET['user_id']]); echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC)); } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') { $stmt = $conn->prepare("INSERT INTO mistake_logs (id, user_id, question, subject, note, date) VALUES (?, ?, ?, ?, ?, ?)"); $stmt->execute([$data->id, $data->user_id, $data->question, $data->subject, $data->note, $data->date]); echo json_encode(["message" => "Saved"]); } } catch(Exception $e) { http_response_code(500); echo json_encode(["error" => $e->getMessage()]); } ?>