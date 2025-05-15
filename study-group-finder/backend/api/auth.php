<?php
// backend/api/auth.php
session_start();
require __DIR__ . '/db.php';
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    /* --------------------------- REGISTER --------------------------- */
    case 'POST':
        $path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
        if (str_ends_with($path, '/register')) {
            $in = json_decode(file_get_contents('php://input'), true);
            foreach (['username', 'email', 'password'] as $f) {
                if (empty($in[$f])) {
                    http_response_code(400);
                    echo json_encode(['error' => "$f required"]);
                    exit;
                }
            }
            try {
                $stmt = $pdo->prepare(
                    'INSERT INTO users (username,email,password_hash)
                     VALUES (?,?,?)'
                );
                $stmt->execute([
                    $in['username'],
                    $in['email'],
                    password_hash($in['password'], PASSWORD_DEFAULT)
                ]);
                $_SESSION['user'] = [
                    'id' => $pdo->lastInsertId(),
                    'username' => $in['username']
                ];
                echo json_encode(['success' => true, 'user' => $_SESSION['user']]);
            } catch (PDOException $e) {
                http_response_code(400);
                echo json_encode(['error' => 'Username or e-mail already taken']);
            }
            exit;
        }

        /* --------------------------- LOGIN ---------------------------- */
        if (str_ends_with($path, '/login')) {
            $in = json_decode(file_get_contents('php://input'), true);
            foreach (['username', 'password'] as $f) {
                if (empty($in[$f])) {
                    http_response_code(400);
                    echo json_encode(['error' => "$f required"]);
                    exit;
                }
            }
            $stmt = $pdo->prepare('SELECT * FROM users WHERE username = ?');
            $stmt->execute([$in['username']]);
            $user = $stmt->fetch();
            if (!$user || !password_verify($in['password'], $user['password_hash'])) {
                http_response_code(401);
                echo json_encode(['error' => 'Invalid credentials']);
                exit;
            }
            $_SESSION['user'] = ['id' => $user['id'], 'username' => $user['username']];
            echo json_encode(['success' => true, 'user' => $_SESSION['user']]);
            exit;
        }

        http_response_code(404);
        echo json_encode(['error' => 'Unknown auth endpoint']);
        exit;

    /* --------------------------- LOGOUT ----------------------------- */
    case 'DELETE':
        session_destroy();
        echo json_encode(['success' => true]);
        exit;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
