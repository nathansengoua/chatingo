<?php 
include '../includes/db.php';
include '../includes/auth.php';

if(isloggedin()){
   $searchquerry = $_GET['query'] ?? '';
    if($searchquerry != ''){
        $stmt =$conn->prepare("SELECT userid, username, status, Profile_image FROM users WHERE username LIKE :search AND userid != :user_id");
        $stmt->bindValue(':search', "%$searchquerry%");
        $stmt->bindParam(':user_id',$_SESSION['user_id']);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($users);
    }else{
        echo json_encode([]);
    }
}
?>