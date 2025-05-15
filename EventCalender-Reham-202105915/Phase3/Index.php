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
$host = "127.0.0.1"; // Database host
$user = getenv("db_user"); // Database user from environment variable
$pass = getenv("db_pass"); // Database password from environment variable
$db   = getenv("db_name"); // Database name from environment variable

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec("SET time_zone = '+03:00'");
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed."]);
    exit;
}

// Parse URI path
$uri = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), "/");
$path = explode("/", $uri);
$method = $_SERVER['REQUEST_METHOD'];

// Unified response function
function respond($code, $data) {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

// Validate endpoint
if (count($path) < 2 || $path[1] !== "events") {
    respond(200, ["message" => "Events API is active"]);
}

// Extract path parameters
$eventId = $path[2] ?? null;

// Handle GET requests
if ($method === "GET") {
    // List all events or a specific event
    if (!$eventId) {
        $stmt = $pdo->query("SELECT * FROM events");
        $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
        respond(200, $events);
    } else {
        $stmt = $pdo->prepare("SELECT * FROM events WHERE id = ?");
        $stmt->execute([$eventId]);
        $event = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$event) respond(404, ["error" => "Event not found with ID: $eventId"]);
        respond(200, $event);
    }
}

// Handle POST requests
if ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $title = htmlspecialchars(trim($data["title"] ?? ""), ENT_QUOTES, 'UTF-8');
    $date = htmlspecialchars(trim($data["date"] ?? ""), ENT_QUOTES, 'UTF-8');
    $description = htmlspecialchars(trim($data["description"] ?? ""), ENT_QUOTES, 'UTF-8');

    if (strlen($title) < 5 || strlen($description) < 20) {
        respond(400, ["error" => "Invalid event input."]);
    }

    $stmt = $pdo->prepare("INSERT INTO events (title, date, description) VALUES (?, ?, ?)");
    $stmt->execute([$title, $date, $description]);
    respond(201, ["message" => "Event created."]);
}

// Handle PUT requests
if ($method === "PUT") {
    if (!$eventId) respond(400, ["error" => "Event ID is required."]);

    $data = json_decode(file_get_contents("php://input"), true);
    $title = htmlspecialchars(trim($data["title"] ?? ""), ENT_QUOTES, 'UTF-8');
    $date = htmlspecialchars(trim($data["date"] ?? ""), ENT_QUOTES, 'UTF-8');
    $description = htmlspecialchars(trim($data["description"] ?? ""), ENT_QUOTES, 'UTF-8');

    $stmt = $pdo->prepare("UPDATE events SET title = ?, date = ?, description = ? WHERE id = ?");
    $stmt->execute([$title, $date, $description, $eventId]);
    respond(200, ["message" => "Event updated."]);
}

// Handle DELETE requests
if ($method === "DELETE") {
    if (!$eventId) respond(400, ["error" => "Event ID is required."]);

    $stmt = $pdo->prepare("DELETE FROM events WHERE id = ?");
    $stmt->execute([$eventId]);
    respond(204, []); // No Content
}

// Fallback if no route matched
respond(404, ["error" => "Invalid request"]);