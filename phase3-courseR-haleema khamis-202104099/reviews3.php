<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

// Change these to match your Replit database info
$host = "localhost";
$db = "your_database_name";
$user = "your_username";
$pass = "your_password";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
} catch (PDOException $e) {
    echo json_encode(["error" => "Cannot connect to database"]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

// GET: Show reviews
if ($method == 'GET') {
    $stmt = $pdo->query("SELECT * FROM reviews ORDER BY created_at DESC");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

// POST: Add review
if ($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['course_name'], $data['rating'], $data['feedback'])) {
        echo json_encode(["error" => "Missing fields"]);
        exit();
    }

    $stmt = $pdo->prepare("INSERT INTO reviews (course_name, rating, feedback) VALUES (?, ?, ?)");
    $stmt->execute([$data['course_name'], $data['rating'], $data['feedback']]);
    echo json_encode(["success" => true]);
}
?>
