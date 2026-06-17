<?php
$base_path = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>わたしの読書ナレッジマネジメントテーブル</title>
    <!-- Google Fonts (Outfit, Noto Sans JP) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
    <!-- FontAwesome (Icons) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- CSS -->
    <link rel="stylesheet" href="<?php echo $base_path; ?>/static/style.css">
</head>
<body>
    <div id="root"></div>

    <!-- React 18 CDN (Production) -->
    <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
    <!-- Babel CDN (For JSX compilation in the browser) -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script>
        // BabelのReact presetで、自動インポートによるimport文の生成を防ぎ、
        // グローバルのReactオブジェクトを使う classic ランタイムを明示的に指定します。
        Babel.registerPreset('react-classic', {
            presets: [
                [Babel.availablePresets['react'], { runtime: 'classic' }],
                Babel.availablePresets['env']
            ]
        });
    </script>

    <!-- React Components -->
    <script type="text/babel" data-presets="react-classic" src="<?php echo $base_path; ?>/static/components/KnowledgeList.js"></script>
    <script type="text/babel" data-presets="react-classic" src="<?php echo $base_path; ?>/static/components/KnowledgeDetail.js"></script>
    <!-- React App Main -->
    <script type="text/babel" data-presets="react-classic" src="<?php echo $base_path; ?>/static/app.js"></script>
</body>
</html>

