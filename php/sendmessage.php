<?php
include '.../includes/db.php';

if (isLoggedIn()) {
    $chat_id = $_POST['chat_id'];
    $message = $_POST['message'];

    $stmt = $conn->prepare("INSERT INTO messages (chat_id, sender_id, message) VALUES (:chat_id, :sender_id, :message)");
    $stmt->bindParam(':chat_id', $chat_id);
    $stmt->bindParam(':sender_id', $_SESSION['user_id']);
    $stmt->bindParam(':message', $message);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to send message']);
    }
}
?>
