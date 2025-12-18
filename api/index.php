<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';
 echo json_encode(["status" => "active", "version" => "12.24", "engine" => "IITGEE_PROD"]); ?>