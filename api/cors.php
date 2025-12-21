<?php
/**
 * IITGEEPrep Engine v16.0 - MySQL Production Core
 * HOSTINGER OPTIMIZED - NO MOCKING
 */
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// PRODUCTION CORS HEADERS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once 'config.php';

/**
 * Standardized JSON Input Reader
 * Essential for modern React Fetch requests.
 */
function getJsonInput() {
    $raw = file_get_contents('php://input');
    if (!$raw) return null;
    $data = json_decode($raw);
    return (json_last_error() === JSON_ERROR_NONE) ? $data : null;
}

function sendError($msg, $code = 400, $details = null) {
    http_response_code($code);
    echo json_encode(["status" => "error", "message" => $msg, "details" => $details]);
    exit;
}

function sendSuccess($data = []) {
    echo json_encode(array_merge(["status" => "success"], $data));
    exit;
}

// MySQL Business logic for cors.php
if(!$conn) sendError("DATABASE_OFFLINE", 500, $db_error);

/**
 * Fixed: Only enforce JSON input on POST/PUT requests to avoid 400 on diagnostic probes
 */
$input = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = getJsonInput();
    if(!$input) sendError("INVALID_JSON_INPUT", 400);
}

sendSuccess(["info" => "Production Endpoint Active", "method" => $_SERVER['REQUEST_METHOD']]);