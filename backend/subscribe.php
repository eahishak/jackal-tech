<?php
$servername = "localhost"; // Change if you are not using localhost
$username = "your_username"; // Change to your database username
$password = "your_password"; // Change to your database password
$dbname = "jackal_tech_db"; // The name of your database

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO subscriptions (full_name, email) VALUES (?, ?)");
$stmt->bind_param("ss", $full_name, $email);

// Set parameters and execute
$full_name = $_POST['full_name'];
$email = $_POST['email'];
$stmt->execute();

echo "New record created successfully";

$stmt->close();
$conn->close();
?>
