<?php
include '../includes/db.php';
include '../includes/auth.php';

$response = [];

try {
    if (empty($_POST['username']) || empty($_POST['password'])) {
        throw new Exception('Username and password are required.');
    }

    $username = $_POST['username'];
    $password = $_POST['password'];

    // Call login function
    if (login($username, $password, $conn)) {
        $response = ['status' => 'success', 'message' => 'Login successful'];
    } else {
        throw new Exception('Invalid username or password.');
    }
} catch (Exception $e) {
    $response = ['status' => 'error', 'message' => $e->getMessage()];
}

// Return JSON response
echo json_encode($response);
?>
