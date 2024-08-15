<?php
include '../includes/db.php';

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
    $profileImage = null; // Initialize to null in case no image is uploaded
    if (isset($_FILES['pimg']) && $_FILES['pimg']['error'] === UPLOAD_ERR_OK) {
        $profileImage = uniqid('profile_', true) . '.' . pathinfo($_FILES['pimg']['name'], PATHINFO_EXTENSION);
        $target_file = $target_dir . $profileImage;

        if (!move_uploaded_file($_FILES['pimg']['tmp_name'], $target_file)) {
            throw new Exception('Error uploading profile image.');
        }
    }

    // Insert into the database
    $stmt = $conn->prepare("INSERT INTO users (Firstname, Lastname, username, email, password, profile_image) VALUES (:fname, :lname, :username, :email, :password, :profile_image)");
    $stmt->bindParam(':fname', $_POST['fname']);
    $stmt->bindParam(':lname', $_POST['lname']);
    $stmt->bindParam(':username', $_POST['uname']);
    $stmt->bindParam(':email', $_POST['email']);
    $stmt->bindParam(':password', password_hash($_POST['password'], PASSWORD_BCRYPT)); // Hashing password
    $stmt->bindParam(':profile_image', $profileImage);

    if ($stmt->execute()) {
        // Set header for JSON response
        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'message' => 'Registration successful']);
    } else {
        throw new Exception('Error during signup.');
    }

} catch (Exception $e) {
    // Set header for JSON response
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
