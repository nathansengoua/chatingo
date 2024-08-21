<?php
include '../includes/auth.php';
include '../includes/db.php';

session_start();

try{
    $status = "Ofline";
    $stmt = $conn->prepare("UPDATE users SET status = :status WHERE users.userid = :userid");
    $stmt->bindParam(':status',$status);
    $stmt->bindParam(':userid',$_SESSION['user_id']);
    $stmt->execute();

} catch (Exception $e) {
    // Using JavaScript alert to display the error message
    echo '<script>alert("Error: ' . htmlspecialchars($e->getMessage()) . '");</script>';
}

logout();
header("Location: ../index.php");
exit();
?>
