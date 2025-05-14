<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


// change to your real values from replit
define('DB_HOST', '127.0.0.1');
define('DB_NAME', 'marketplace-333');
define('DB_USER', 'main');
define('DB_PASS', 'abcd1234');


try {
  $pdo = new PDO(
    "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,
    DB_USER,
    DB_PASS,
    [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]
  );
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode([ 'error' => 'DB connection failed: ' . $e->getMessage() ]);
  exit;
}
