<?php
include '../includes/db.php';
include '../includes/auth.php'; 

function fetchchatid($conn, $other_user_id) {
    $stmt = $conn->prepare(
        "SELECT chats.id, users.username, users.status, users.Profile_image 
         FROM chats 
         JOIN users ON (users.userid = :other_user) 
         WHERE (chats.user1_id = :user1 AND chats.user2_id = :user2) 
         OR (chats.user1_id = :user2 AND chats.user2_id = :user1)"
    );
    $stmt->bindParam(':user1', $_SESSION['user_id']);
    $stmt->bindParam(':user2', $other_user_id);
    $stmt->bindParam(':other_user', $other_user_id); // Binding the other user's ID
    $stmt->execute();
    return $stmt;
}

if (isloggedin()) {
    $other_user_id = $_POST['other_user_id'];
    $stmt = fetchchatid($conn, $other_user_id);

    if ($stmt->rowCount() == 0) {
        // No conversation found, creating a new one
        $stmt = $conn->prepare("INSERT INTO chats (user1_id, user2_id) VALUES (:user1, :user2)");
        $stmt->bindValue(':user1', $_SESSION['user_id']);
        $stmt->bindValue(':user2', $other_user_id);

        if ($stmt->execute()) {
            $stmt = fetchchatid($conn, $other_user_id); // Re-fetch the chat after creating it
        }
    }

    // Fetch the chat details
    $chat = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($chat);
} else {
    echo json_encode(['error' => 'User not logged in']);
}
?>
