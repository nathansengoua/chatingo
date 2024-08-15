<?php
include '../includes/db.php';
include '../includes/auth.php'; 

if (isloggedin()) {
    $chat_id = $_GET['chat_id'];
    $stmt = $conn->prepare("SELECT m.message, m.created_at, u.username FROM messages m JOIN users u ON m.sender_id = u.userid WHERE chat_id = :chat_id ORDER BY m.created_at ASC");
    $stmt->bindParam(':chat_id', $chat_id);
    $stmt->execute();
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($messages);
}
?>
