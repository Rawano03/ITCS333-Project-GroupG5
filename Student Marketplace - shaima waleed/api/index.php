<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

require('connection.php');

switch ($_SERVER['REQUEST_METHOD']) {
  case "GET":
    if (isset($_GET['id'])) {
      $stmt = $pdo->prepare("SELECT * FROM marketplace_items WHERE id = ?");
      $stmt->execute([ $_GET['id'] ]);
      $item = $stmt->fetch();
      echo json_encode($item ?: []);
    } else {
      $stmt = $pdo->query("SELECT * FROM marketplace_items");
      $items = $stmt->fetchAll();
      echo json_encode($items);
    }
    break;

  case "POST":
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['title'], $input['price'])) {
      http_response_code(400);
      echo json_encode([ 'error' => 'Title and price are required.' ]);
      exit;
    }

    $query = $pdo->prepare("INSERT INTO marketplace_items (title, price, description, image, posted_by, status, category, date_posted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $query->execute([
      $input['title'],
      $input['price'],
      $input['description'] ?? '',
      $input['image'] ?? 'img/default.jpg',
      $input['posted_by'] ?? 'You',
      $input['status'] ?? 'New',
      $input['category'] ?? 'other',
      $input['date_posted'] ?? date('Y-m-d')
    ]);

    echo json_encode([ 'message' => 'Item posted successfully.' ]);
    break;

  case "DELETE":
    parse_str(file_get_contents("php://input"), $params);

    if (!isset($params['id'])) {
      http_response_code(400);
      echo json_encode([ 'error' => 'Item ID is required for deletion.' ]);
      exit;
    }

    $query = $pdo->prepare("DELETE FROM marketplace_items WHERE id = ?");
    $query->execute([ $params['id'] ]);

    echo json_encode([ 'message' => 'Item deleted successfully.' ]);
    break;

  default:
    http_response_code(405);
    echo json_encode([ 'error' => 'Method not allowed' ]);
    break;
}
