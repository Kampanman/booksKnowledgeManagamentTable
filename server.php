<?php
header('Content-Type: application/json; charset=utf-8');

// エラー出力を無効化（JSON返却時に余計な出力が混ざらないようにするため）
ini_set('display_errors', 0);
error_reporting(E_ALL);

$action = isset($_GET['action']) ? $_GET['action'] : '';

$storage_dir = __DIR__ . '/storage';
$relator_file = $storage_dir . '/relator.csv';
$knowledgespace_dir = $storage_dir . '/knowledgespace';

// CSVファイルのBOMを削除する関数
function remove_bom($str) {
    $bom = pack('H*', 'EFBBBF');
    return preg_replace("/^$bom/", '', $str);
}

if ($action === 'list') {
    if (!file_exists($relator_file)) {
        echo json_encode([]);
        exit;
    }
    
    $list = [];
    if (($handle = fopen($relator_file, "r")) !== FALSE) {
        $header = fgetcsv($handle);
        if ($header) {
            $header[0] = remove_bom($header[0]);
            
            while (($data = fgetcsv($handle)) !== FALSE) {
                // 空行や不正な行をスキップ
                if (count($data) < 3 || empty(trim($data[0]))) {
                    continue;
                }
                $list[] = [
                    'file_title' => trim($data[0]),
                    'view_title' => trim($data[1]),
                    'view_cols' => array_map('trim', explode('/', $data[2]))
                ];
            }
        }
        fclose($handle);
    }
    echo json_encode($list);
    exit;
}

if ($action === 'detail') {
    $file = isset($_GET['file']) ? $_GET['file'] : '';
    // ディレクトリトラバーサル対策
    $file = basename($file);
    
    if (empty($file)) {
        echo json_encode(['error' => 'ファイル名パラメータが指定されていません。']);
        exit;
    }
    
    // まず relator.csv から設定を取得
    $target_relator = null;
    if (file_exists($relator_file)) {
        if (($handle = fopen($relator_file, "r")) !== FALSE) {
            $header = fgetcsv($handle);
            if ($header) {
                $header[0] = remove_bom($header[0]);
                while (($data = fgetcsv($handle)) !== FALSE) {
                    if (count($data) >= 3 && trim($data[0]) === $file) {
                        $target_relator = [
                            'file_title' => trim($data[0]),
                            'view_title' => trim($data[1]),
                            'view_cols' => array_map('trim', explode('/', $data[2]))
                        ];
                        break;
                    }
                }
            }
            fclose($handle);
        }
    }
    
    if (!$target_relator) {
        echo json_encode(['error' => '指定されたファイルが relator.csv に登録されていません。']);
        exit;
    }
    
    $csv_file = $knowledgespace_dir . '/' . $file . '.csv';
    if (!file_exists($csv_file)) {
        echo json_encode(['error' => "CSVファイルが見つかりません: {$file}.csv"]);
        exit;
    }
    
    $rows = [];
    $all_cols = [];
    if (($handle = fopen($csv_file, "r")) !== FALSE) {
        $header = fgetcsv($handle);
        if ($header) {
            $header[0] = remove_bom($header[0]);
            $all_cols = array_map('trim', $header);
            
            while (($data = fgetcsv($handle)) !== FALSE) {
                // 空行をスキップ
                if (count($data) == 1 && empty($data[0])) {
                    continue;
                }
                $row = [];
                foreach ($all_cols as $index => $col_name) {
                    $row[$col_name] = isset($data[$index]) ? trim($data[$index]) : '';
                }
                $rows[] = $row;
            }
        }
        fclose($handle);
    }
    
    echo json_encode([
        'file_title' => $target_relator['file_title'],
        'view_title' => $target_relator['view_title'],
        'view_cols' => $target_relator['view_cols'],
        'all_cols' => $all_cols,
        'data' => $rows
    ]);
    exit;
}

echo json_encode(['error' => '無効なアクションです。']);
exit;
