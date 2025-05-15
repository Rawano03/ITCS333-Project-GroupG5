<?php
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (php_sapi_name() === 'cli-server' && file_exists(__DIR__ . $uri) && !str_starts_with($uri, '/api')) {
    return false;
}

if (str_starts_with($uri, '/api')) {
    require __DIR__ . '/backend/api/index.php';
    exit;
}

require __DIR__ . '/index.html';
