<?php
include '../includes/db.php';
include '../includes/auth.php';

$response = [];

try {
    // Ensure upload directory exists
    $target_dir = "../uploads/";
    if (!is_dir($target_dir)) {
        if (!mkdir($target_dir, 0777, true)) {
            throw new Exception('Failed to create upload directory.');
        }
    }

    // Handle file upload
    $profileImage = null;
    if (isset($_FILES['pimg']) && $_FILES['pimg']['error'] === UPLOAD_ERR_OK) {
        $profileImage = uniqid('profile_', true) . '.' . pathinfo($_FILES['pimg']['name'], PATHINFO_EXTENSION);
        $target_file = $target_dir . $profileImage;
    }

    // Check if username or email already exists
    $stmt2 = $conn->prepare("SELECT email, username FROM users WHERE email = :email OR username = :username");
    $stmt2->bindParam(':username', $_POST['uname']);
    $stmt2->bindParam(':email', $_POST['email']);
    $stmt2->execute();
    
    if ($stmt2->rowCount() > 0) {
        $rs = $stmt2->fetch(PDO::FETCH_ASSOC);
        if ($rs['email'] === $_POST['email']) {
            throw new Exception("Email already used!");
        }
        if ($rs['username'] === $_POST['uname']) {
            throw new Exception("Username already used!");
        }
    } else {
        // Insert user into database
        $stmt = $conn->prepare("INSERT INTO users (Firstname, Lastname, username, email, password, profile_image) VALUES (:fname, :lname, :username, :email, :password, :profile_image)");
        $stmt->bindParam(':fname', $_POST['fname']);
        $stmt->bindParam(':lname', $_POST['lname']);
        $stmt->bindParam(':username', $_POST['uname']);
        $stmt->bindParam(':email', $_POST['email']);
        $hashedPassword = password_hash($_POST['password'], PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':profile_image', $profileImage);

        if ($stmt->execute()) {
            // Move uploaded file
            if ($profileImage !== null && !move_uploaded_file($_FILES['pimg']['tmp_name'], $target_file)) {
                throw new Exception('Error uploading profile image.');
            }

            // Automatically log the user in
            if (login($_POST['uname'], $_POST['password'], $conn)) {
                $response = ['status' => 'success', 'message' => 'Registration successful'];
            } else {
                throw new Exception('Registration failed.');
            }
        } else {
            throw new Exception('Error during signup.');
        }
    }
} catch (Exception $e) {
    $response = ['status' => 'error', 'message' => $e->getMessage()];
}

// Ensure JSON response is sent without any prior output
header('Content-Type: application/json');
echo json_encode($response);
exit();  // Make sure the script exits after sending the JSON response
?>
