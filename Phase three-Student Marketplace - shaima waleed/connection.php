<?php
$host = '127.0.0.1';  
$db   = 'shayma_marketplace333';       
$user = 'shayma';
$pass = 'Cyber20037$';       

$dsn = "mysql:host=$host;dbname=$db";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, 
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,      
    PDO::ATTR_EMULATE_PREPARES   => false,                
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    // echo "Connected successfully!";
} catch (\PDOException $e) {
    http_response_code(500);
    echo "Database connection failed: " . $e->getMessage();
    exit;
}
?>