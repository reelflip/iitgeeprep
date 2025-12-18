<?php
// CRITICAL: Disable error display to client, log to file instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

include_once 'cors.php';
include_once 'config.php';

$data = json_decode(file_get_contents('php://input'));
if(!empty($data->id)) {
    $fields = []; $values = [];
    foreach(['name','target_exam','target_year','institute','school','phone','dob','gender'] as $f) {
        if(isset($data->$f)) { $fields[] = "$f = ?"; $values[] = $data->$f; }
    }
    if($fields) {
        $values[] = $data->id;
        $stmt = $conn->prepare("UPDATE users SET " . implode(', ', $fields) . " WHERE id = ?");
        $stmt->execute($values);
        echo json_encode(["status" => "success"]);
    }
}
?>