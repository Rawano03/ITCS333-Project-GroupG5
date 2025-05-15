<?php
// backend/api/index.php
header('Content-Type: application/json');
require __DIR__ . '/db.php';

$path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$segments = $path === '' ? [] : explode('/', $path);

if (isset($segments[0]) && $segments[0] === 'api') {
    array_shift($segments);            // drop the leading "api"
}

$resource = $segments[0] ?? null;     // e.g. groups / members / comments
$id = $segments[1] ?? null;     // numeric id or null

switch ($resource) {
    case 'groups':
        require __DIR__ . '/groups.php';
        break;
    case 'comments':
        require __DIR__ . '/comments.php';
        break;
    case 'login':
    case 'register':
    case 'logout':   // handled via DELETE /api/logout
        require __DIR__ . '/auth.php';
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Unknown endpoint']);
}
