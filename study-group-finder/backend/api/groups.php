<?php

$method = $_SERVER['REQUEST_METHOD'];

function selectAll($pdo, $sql, $params = [])
{
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    return $stmt->fetchAll();
}

switch ($method) {

    case 'GET':
        if ($id) {
            $stmt = $pdo->prepare('SELECT * FROM study_groups WHERE id = ?');
            $stmt->execute([$id]);
            $group = $stmt->fetch();
            if (!$group) {
                http_response_code(404);
                echo json_encode(['error' => 'Group not found']);
                exit;
            }

            $group['rules'] = selectAll(
                $pdo,
                'SELECT rule_text FROM group_rules WHERE group_id = ?',
                [$id]
            );

            /* members (join users) */
            $group['members'] = selectAll(
                $pdo,
                'SELECT u.username AS name,
                        gm.role     AS role,
                        u.avatar_url AS avatar
                 FROM group_members gm
                 JOIN users u ON gm.user_id = u.id
                 WHERE gm.group_id = ?',
                [$id]
            );

            $group['comments'] = selectAll(
                $pdo,
                'SELECT u.username      AS author,
                        gc.comment_text AS comment_text,
                        gc.created_at
                 FROM group_comments gc
                 JOIN users u ON gc.user_id = u.id
                 WHERE gc.group_id = ?
                 ORDER BY gc.created_at DESC',
                [$id]
            );

            echo json_encode($group);
            break;
        }

        $search = $_GET['search'] ?? '';
        $subject = $_GET['subject'] ?? '';
        $page = max(1, (int) ($_GET['page'] ?? 1));
        $perPage = min(50, max(1, (int) ($_GET['perPage'] ?? 10)));
        $offset = ($page - 1) * $perPage;

        $where = [];
        $params = [];
        if ($search !== '') {
            $where[] = 'name LIKE ?';
            $params[] = "%{$search}%";
        }
        if ($subject !== '') {
            $where[] = 'subject = ?';
            $params[] = $subject;
        }
        $whereSql = $where ? 'WHERE ' . implode(' AND ', $where) : '';

        $total = $pdo->prepare("SELECT COUNT(*) FROM study_groups {$whereSql}");
        $total->execute($params);
        $total = (int) $total->fetchColumn();

        $sql = "SELECT * FROM study_groups {$whereSql}
                ORDER BY created_at DESC
                LIMIT ?,?";
        $stmt = $pdo->prepare($sql);
        foreach ($params as $i => $v)
            $stmt->bindValue($i + 1, $v);
        $stmt->bindValue(count($params) + 1, $offset, PDO::PARAM_INT);
        $stmt->bindValue(count($params) + 2, $perPage, PDO::PARAM_INT);
        $stmt->execute();
        $data = $stmt->fetchAll();

        echo json_encode([
            'data' => $data,
            'total' => $total,
            'page' => $page,
            'perPage' => $perPage,
        ]);
        break;

    case 'POST':
        $in = json_decode(file_get_contents('php://input'), true);

        foreach (['name', 'subject', 'description', 'location', 'meeting_times'] as $f) {
            if (empty($in[$f])) {
                http_response_code(400);
                echo json_encode(['error' => "$f is required"]);
                exit;
            }
        }

        $stmt = $pdo->prepare(
            'INSERT INTO study_groups
           (name,subject,description,location,meeting_times,current_focus,
            photo_url,creator_id,max_members)
           VALUES (?,?,?,?,?,?,?,?,?)'
        );
        $stmt->execute([
            $in['name'],
            $in['subject'],
            $in['description'],
            $in['location'],
            $in['meeting_times'],
            $in['current_focus'] ?? null,
            $in['photo_url'] ?? null,
            $in['creator_id'],
            $in['max_members'] ?? null
        ]);
        $newId = $pdo->lastInsertId();

        if (!empty($in['rules']) && is_array($in['rules'])) {
            $rstmt = $pdo->prepare('INSERT INTO group_rules (group_id,rule_text) VALUES (?,?)');
            foreach ($in['rules'] as $rule)
                $rstmt->execute([$newId, $rule]);
        }

        http_response_code(201);
        echo json_encode(['id' => $newId]);
        break;

    case 'PUT':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID required']);
            exit;
        }
        $in = json_decode(file_get_contents('php://input'), true);
        $sets = [];
        $vals = [];
        foreach (['name', 'subject', 'description', 'location', 'meeting_times', 'current_focus', 'photo_url', 'max_members'] as $col) {
            if (isset($in[$col])) {
                $sets[] = "$col = ?";
                $vals[] = $in[$col];
            }
        }
        if (!$sets) {
            http_response_code(400);
            echo json_encode(['error' => 'No fields to update']);
            exit;
        }
        $vals[] = $id;
        $stmt = $pdo->prepare('UPDATE study_groups SET ' . implode(',', $sets) . ' WHERE id=?');
        $stmt->execute($vals);
        echo json_encode(['updated' => $stmt->rowCount()]);
        break;

    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID required']);
            exit;
        }
        $stmt = $pdo->prepare('DELETE FROM study_groups WHERE id=?');
        $stmt->execute([$id]);
        echo json_encode(['deleted' => $stmt->rowCount()]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
