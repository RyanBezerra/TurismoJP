<?php
require __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $params = [];
    $where = 'WHERE is_active = 1';

    if (!empty($_GET['tipo'])) {
        $where .= ' AND tipo = :tipo';
        $params[':tipo'] = $_GET['tipo'];
    }
    if (!empty($_GET['bairro'])) {
        $where .= ' AND bairro = :bairro';
        $params[':bairro'] = $_GET['bairro'];
    }

    $sql = "SELECT id, owner_id, nome, tipo, bairro, descricao, imagem, contato, pagamento_url, google_maps_url, latitude, longitude, has_location, views, is_active, created_at, updated_at FROM businesses $where ORDER BY created_at DESC LIMIT 500";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    echo json_encode(['items' => $rows]);
    exit;
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true) ?: [];

    $required = ['owner_id', 'nome', 'tipo', 'bairro', 'descricao'];
    foreach ($required as $key) {
        if (empty($data[$key])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing field', 'field' => $key]);
            exit;
        }
    }

    $sql = 'INSERT INTO businesses (id, owner_id, nome, tipo, bairro, descricao, imagem, contato, pagamento_url, google_maps_url, latitude, longitude, has_location, is_active) VALUES (:id, :owner_id, :nome, :tipo, :bairro, :descricao, :imagem, :contato, :pagamento_url, :google_maps_url, :latitude, :longitude, :has_location, 1)';

    $id = bin2hex(random_bytes(13));
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':id' => $id,
        ':owner_id' => $data['owner_id'],
        ':nome' => $data['nome'],
        ':tipo' => $data['tipo'],
        ':bairro' => $data['bairro'],
        ':descricao' => $data['descricao'],
        ':imagem' => $data['imagem'] ?? '',
        ':contato' => $data['contato'] ?? '',
        ':pagamento_url' => $data['pagamento_url'] ?? null,
        ':google_maps_url' => $data['google_maps_url'] ?? null,
        ':latitude' => $data['latitude'] ?? null,
        ':longitude' => $data['longitude'] ?? null,
        ':has_location' => !empty($data['latitude']) && !empty($data['longitude']) ? 1 : 0,
    ]);

    echo json_encode(['ok' => true, 'id' => $id]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
?>




