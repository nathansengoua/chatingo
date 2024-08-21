<?php
session_start();
include '../includes/db.php';
include '../includes/auth.php';
requireLogin();

$user_id = $_SESSION['user_id'];

try {
   
    $stmt = $conn->prepare('SELECT userid, username, status, Profile_image FROM users 
                            JOIN chats ON users.userid = chats.user2_id 
                            WHERE chats.user1_id= :user_id;');
    $stmt->execute(['user_id' => $user_id]);
    $chats = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($chats);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
