<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$host = 'localhost';
$db_name = 'campus_hub';
$username = 'root';
$password = ''; 

try{
    $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

function getJsonInput() {
    return json_decode(file_get_contents("php://input"), true);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare("SELECT * FROM course_notes WHERE id = :id");
            $stmt->execute(['id' => $_GET['id']]);
            $note = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($note ?: ['message' => 'Note not found']);
        }
        else {
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $limit = 10;
            $offset = ($page - 1) * $limit;
            $stmt = $pdo->prepare("SELECT * FROM course_notes ORDER BY created_at DESC LIMIT :limit OFFSET :offset");
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();
            $notes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($notes);
        }
        break;

    case 'POST':
        $data = getJsonInput();
        if (!isset($data['title'], $data['content'], $data['author'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }
        $stmt = $pdo->prepare("INSERT INTO course_notes (title, content, author, created_at) VALUES (:title, :content, :author, NOW())");
        $success = $stmt->execute([
            'title' => htmlspecialchars(strip_tags($data['title'])),
            'content' => htmlspecialchars(strip_tags($data['content'])),
            'author' => htmlspecialchars(strip_tags($data['author']))
        ]);
        echo json_encode(['message' => $success ? 'Note created' : 'Failed to create note']);
        break;

    case 'PUT':
        $data = getJsonInput();
        if (!isset($data['id'], $data['title'], $data['content'], $data['author'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }
        $stmt = $pdo->prepare("UPDATE course_notes SET title = :title, content = :content, author = :author WHERE id = :id");
        $success = $stmt->execute([
            'id' => $data['id'],
            'title' => htmlspecialchars(strip_tags($data['title'])),
            'content' => htmlspecialchars(strip_tags($data['content'])),
            'author' => htmlspecialchars(strip_tags($data['author']))
        ]);
        echo json_encode(['message' => $success ? 'Note updated' : 'Failed to update note']);
        break;

    case 'DELETE':
        $data = getJsonInput();
        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing note ID']);
            exit;
        }
        $stmt = $pdo->prepare("DELETE FROM course_notes WHERE id = :id");
        $success = $stmt->execute(['id' => $data['id']]);
        echo json_encode(['message' => $success ? 'Note deleted' : 'Failed to delete note']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>