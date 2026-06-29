# わたしの読書ナレッジマネジメントテーブル プロジェクトサマリー

さくらレンタルサーバーなどの一般的なPHPが稼働するサーバーへ、フォルダごとアップロードすることでそのままご利用いただけます。

## 📁 ディレクトリ構成

本プロジェクトのファイル群の構成は以下の通りです。

- [booksKnowledgeManagamentTable]
  - [index.php](./index.php) - メイン画面。React (CDN版) と Babel (CDN版) を読み込みます。
  - [server.php](./server.php) - CSVデータを解析してJSON形式で返却するPHPスクリプト。
  - [static/](./static)
    - [app.js](./static/app.js) - Reactのメインロジック（表示切替やデータ取得など）。
    - [style.css](./static/style.css) - 洗練されたモダンなデザインを司るCSS。
    - [components/](./static/components)
      - [KnowledgeList.js](./static/components/KnowledgeList.js) - 検索・ソート・ページネーション付きのナレッジ一覧コンポーネント。
      - [KnowledgeDetail.js](./static/components/KnowledgeDetail.js) - 詳細テーブル表示と、展開エリアを司るコンポーネント。
  - [storage/](./storage)
    - [relator.csv](./storage/relator.csv) - CSVファイルと画面表示名の紐付け定義ファイル。
    - [knowledgespace/](./storage/knowledgespace)
      - [sample.csv](./storage/knowledgespace/sample.csv) - 動作確認用のサンプルCSVファイル。

---

## 🛠️ 各ファイルの役割と実装概要

### 1. `index.php`
React 18 と Babel CDN を使用し、ビルド環境（WebpackやViteなど）を用意することなく、ブラウザ上で直接JSXコードを実行できる構成にしています。これにより、さくらレンタルサーバー等へのアップロードだけで動作します。

### 2. `server.php`
セキュリティ対策（ディレクトリトラバーサル防止）や、CSVの文字コードBOM対策を組み込んでいます。
- `action=list`: `relator.csv` を解析してナレッジの一覧を返します。
- `action=detail&file=xxx`: 指定されたCSVファイルを解析し、`relator.csv` で指定されたカラム（`view_cols`）と、その他のカラム情報を併せて返却します。

### 3. `static/app.js`
アプリケーション全体のステート（一覧・詳細画面の切り替え、読み込み中やエラー表示、選択中のデータなど）を管理します。

### 4. `static/components/KnowledgeList.js`
ナレッジタイトルでの検索フィルター、昇順・降順ソート、1ページあたりの表示件数切り替え（10, 20, 50, 100件）、およびページネーション機能を内包した一覧テーブルです。

### 5. `static/components/KnowledgeDetail.js`
指定されたカラムのみを表形式で表示し、右端の「展開」ボタンを押すと、その行の残りのカラム情報をテーブル下部の「詳細情報」エリアにグリッドレイアウトで分かりやすく表示します。他の行の展開ボタンを押すか「選択しなおす」を押すことで、表示内容は自動でクリアされます。

### 6. `static/style.css`
インディゴとシアンを基調とした、清潔感とプレミアム感のあるモダンなデザインです。
- スマートフォン表示にも対応したレスポンシブデザイン。
- ホバーエフェクトやフェードインアニメーションによる快適なUI操作。
- 画面右下のフローティング「↑」トップに戻るボタンの設置。

---

## 🚀 動作確認方法

ローカル環境やレンタルサーバーに上記ディレクトリを配置し、ブラウザで `index.php` にアクセスするだけで稼働します。
サンプルとして登録されている「サンプルブック」が一覧に表示され、「選択」ボタンを押すことで詳細データの展開などが確認できます。
