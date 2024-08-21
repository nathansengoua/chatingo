<?php
session_start();
include '../includes/db.php';
include '../includes/auth.php';
requireLogin();

$user_id = $_SESSION['user_id'];

try {
   
    $stmt = $conn->prepare('SELECT * FROM users WHERE userid= :user_id;');
    $stmt->execute(['user_id' => $user_id]);
    $loads = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($loads);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
