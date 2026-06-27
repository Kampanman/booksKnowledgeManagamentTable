<?php
$base_path = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>わたしの読書ナレッジマネジメントテーブル</title>
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%231e1b4b'/%3E%3Cpath d='M7 9 Q7 8 8 8 L15 8 Q15.5 8 16 8.5 Q16.5 8 17 8 L24 8 Q25 8 25 9 L25 23 Q25 24 24 24 L17.5 24 Q16.5 24.5 15.5 24 L8 24 Q7 24 7 23 Z' fill='%234338ca'/%3E%3Cpath d='M16 8.5 L16 24' stroke='%2338bdf8' stroke-width='1' opacity='0.8'/%3E%3Cpath d='M9 11 L14.5 11' stroke='%2338bdf8' stroke-width='1.2' stroke-linecap='round' opacity='0.9'/%3E%3Cpath d='M9 14 L14.5 14' stroke='%2338bdf8' stroke-width='1.2' stroke-linecap='round' opacity='0.9'/%3E%3Cpath d='M9 17 L14.5 17' stroke='%2338bdf8' stroke-width='1.2' stroke-linecap='round' opacity='0.7'/%3E%3Cpath d='M9 20 L14.5 20' stroke='%2338bdf8' stroke-width='1.2' stroke-linecap='round' opacity='0.7'/%3E%3Cpath d='M17.5 11 L23 11' stroke='%2338bdf8' stroke-width='1.2' stroke-linecap='round' opacity='0.9'/%3E%3Cpath d='M17.5 14 L23 14' stroke='%2338bdf8' stroke-width='1.2' stroke-linecap='round' opacity='0.9'/%3E%3Cpath d='M17.5 17 L23 17' stroke='%2338bdf8' stroke-width='1.2' stroke-linecap='round' opacity='0.7'/%3E%3Cpath d='M17.5 20 L23 20' stroke='%2338bdf8' stroke-width='1.2' stroke-linecap='round' opacity='0.7'/%3E%3C/Svg%3E">
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

