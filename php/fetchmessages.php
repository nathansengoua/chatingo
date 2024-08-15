<?php
include '../includes/db.php';

if (isLoggedIn()) {
    $chat_id = $_GET['chat_id'];
    $stmt = $conn->prepare("SELECT m.message, m.timestamp, u.username FROM messages m JOIN users u ON m.sender_id = u.id WHERE chat_id = :chat_id ORDER BY m.timestamp ASC");
    $stmt->bindParam(':chat_id', $chat_id);
    $stmt->execute();
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($messages);
}
?>
