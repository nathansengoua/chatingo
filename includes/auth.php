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
            try{
                $status = "Online";
                $stmt = $conn->prepare("UPDATE users SET status = :status WHERE users.userid = :userid");
                $stmt->bindParam(':status',$status);
                $stmt->bindParam(':userid',$user['userid']);
                $stmt->execute();
            } catch (Exception $e) {
                
            }
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
