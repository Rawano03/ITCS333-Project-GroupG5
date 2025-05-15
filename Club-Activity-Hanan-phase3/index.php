<?php
// Allow CORS and set response content type to JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Set the default timezone to Bahrain
date_default_timezone_set('Asia/Bahrain');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Setup DB connection
$host = "127.0.0.1";
$user = getenv("db_user");
$pass = getenv("db_pass");
$db   = getenv("db_name");

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec("SET time_zone = '+03:00'");
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed."]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

// Unified response function
function respond($code, $data) {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

// Handle GET request (list activities)
if ($method === "GET") {
    $stmt = $pdo->query("SELECT * FROM activities ORDER BY created_at DESC");
    respond(200, $stmt->fetchAll(PDO::FETCH_ASSOC));
}

// Handle POST request (add new activity)
if ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['name'], $data['category'], $data['responsible_person'], $data['email'], $data['description'])) {
        respond(400, ["error" => "Missing required fields"]);
    }

    $stmt = $pdo->prepare("INSERT INTO activities (name, category, responsible_person, email, description) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['name'],
        $data['category'],
        $data['responsible_person'],
        $data['email'],
        $data['description']
    ]);

    respond(201, ["message" => "Activity added successfully"]);
}

// Fallback
respond(405, ["error" => "Method not allowed"]);
