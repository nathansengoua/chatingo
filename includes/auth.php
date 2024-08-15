<?php
// Authentication configurations

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function isloggedin() { 
    return isset($_SESSION['user_id']);
}

function requireLogin() {
    if (!isloggedin()) { // Consistent function name
        header('Location: index.php');
        exit();
    }
}

function login($username, $password, $conn) {
    $stmt = $conn->prepare("SELECT userid, username, password FROM users WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['userid'];
            $_SESSION['username'] = $user['username'];
            return true;
        }
    }
    return false;
}

function logout() {
    session_unset();
    session_destroy();
}
?>
