<?php
include '../includes/db.php';
include '../includes/auth.php';

if (isloggedin()) {
    // Check if the 'other_user_id' is set in POST data
    if (isset($_POST['other_user_id'])) {
        $other_user_id = $_POST['other_user_id'];

        // Check if the 'chats' table exists
        $stmt = $conn->prepare("SHOW TABLES LIKE 'chats'");
        $stmt->execute();
        if ($stmt->rowCount() == 0) {
            echo json_encode(['error' => 'Chats table does not exist']);
            exit();
        }

        $stmt = $conn->prepare(
            "SELECT id FROM chats WHERE (user1_id = :user1 AND user2_id = :user2) 
            OR (user1_id = :user2 AND user2_id = :user1)"
        );
        $stmt->bindParam(':user1', $_SESSION['user_id']);
        $stmt->bindParam(':user2', $other_user_id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $chat = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['chat_id' => $chat['id']]);
        } else {
            $stmt = $conn->prepare("INSERT INTO chats (user1_id, user2_id) VALUES (:user1, :user2)");
            $stmt->bindValue(':user1', $_SESSION['user_id']);
            $stmt->bindValue(':user2', $other_user_id);

            if ($stmt->execute()) {
                echo json_encode(['chat_id' => $conn->lastInsertId()]);
            } else {
                echo json_encode(['error' => 'Failed to start chat']);
            }
        }
    } else {
        echo json_encode(['error' => 'Other user ID is required']);
    }
} else {
    echo json_encode(['error' => 'User not logged in']);
}
?>
