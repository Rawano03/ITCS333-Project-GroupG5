<?php
require __DIR__ . '/db.php';
header('Content-Type: application/json');

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $in = json_decode(file_get_contents('php://input'), true);
        foreach (['group_id', 'user_id', 'comment_text'] as $f) {
            if (empty($in[$f])) {
                http_response_code(400);
                echo json_encode(['error' => "$f is required"]);
                exit;
            }
        }
        $stmt = $pdo->prepare(
            'INSERT INTO group_comments (group_id,user_id,comment_text) VALUES (?,?,?)'
        );
        $stmt->execute([$in['group_id'], $in['user_id'], $in['comment_text']]);
        $id = $pdo->lastInsertId();

        $row = $pdo->prepare(
            'SELECT u.username AS author,
                    gc.comment_text,
                    gc.created_at
             FROM group_comments gc
             JOIN users u ON gc.user_id = u.id
             WHERE gc.id = ?'
        );
        $row->execute([$id]);
        http_response_code(201);
        echo json_encode($row->fetch());
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
