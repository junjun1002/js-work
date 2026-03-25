# ==========================================
# ToDoアプリ 実装手順書
# React + Node.js + Express
# ==========================================

## 0. この手順書で作るもの
バックエンド未経験者向けに、以下の機能を持つ ToDoアプリを作る。

- ToDo一覧を表示する
- ToDoを追加する
- ToDoの完了状態を切り替える
- ToDoを削除する

学習目的として、次の流れを一通り体験する。

- Reactで画面を作る
- Node.js + ExpressでAPIを作る
- フロントエンドからAPIを呼ぶ
- サーバー側でデータを管理する

---

## 1. 先に決める構成
最初の制作では、難しくしすぎない構成がおすすめ。

### 採用構成
- フロントエンド: React
- バックエンド: Node.js + Express
- データ保存: まずはメモリ保存、慣れたら JSONファイル保存

### フォルダ構成例

```txt
js/
  ReactWork.md
  react-app/
    src/
      app/
        App.jsx
        main.jsx
  todo-api/
    package.json
    server.js
```

---

## 2. 作る機能を先に整理する
最初に全部盛りにしないことが大事。

### 最低限の機能
1. 一覧表示
2. 追加
3. 完了切り替え
4. 削除

### 余裕があれば追加する機能
- 未完了のみ表示
- 件数表示
- 入力バリデーション
- JSONファイルへの保存

---

## 3. APIの設計を先に決める
画面より前に、どんな通信をするか決めると実装が楽になる。

### ToDoデータの形

```js
{
  id: 1,
  title: "牛乳を買う",
  completed: false
}
```

### 作るAPI

#### `GET /todos`
- ToDo一覧を返す

#### `POST /todos`
- 新しいToDoを追加する

送るデータ例:

```json
{
  "title": "部屋を片付ける"
}
```

#### `PATCH /todos/:id`
- 完了状態を切り替える

送るデータ例:

```json
{
  "completed": true
}
```

#### `DELETE /todos/:id`
- 指定したToDoを削除する

---

## 4. 実装のおすすめ順
この順番で進めると詰まりにくい。

1. Node.js + ExpressでAPIだけ作る
2. APIをブラウザやツールで確認する
3. Reactで画面だけ作る
4. ReactからAPIを呼ぶ
5. 追加、更新、削除をつなぐ
6. 見た目を整える
7. 余裕があれば保存処理を追加する

---

## 5. バックエンド実装手順

## 5-1. バックエンド用フォルダを作る
プロジェクト直下に `todo-api` を作る。

```txt
todo-api/
  package.json
  server.js
```

## 5-2. 初期化とインストール
`todo-api` で以下を実行する。

```powershell
npm init -y
npm install express cors
```

### `express`
- APIサーバーを作るために使う

### `cors`
- ReactからNode.jsのAPIを呼べるようにする

## 5-3. 最初のサーバーを作る
`todo-api/server.js` を作って、まずはサーバー起動だけ確認する。

やること:
- `express()` を作る
- `app.use(cors())` を設定する
- `app.use(express.json())` を設定する
- `app.listen(3001)` で起動する

確認できる状態:
- `http://localhost:3001` にアクセスできる
- ターミナルに起動メッセージが出る

## 5-4. 仮データを作る
最初はDBなしで、配列で持つ。

例:

```js
let todos = [
  { id: 1, title: "買い物に行く", completed: false },
  { id: 2, title: "課題を進める", completed: true }
];
```

## 5-5. 一覧取得APIを作る
まずは `GET /todos` を実装する。

やること:
- `app.get("/todos", ...)` を作る
- `todos` 配列をそのまま返す

確認:
- ブラウザで `http://localhost:3001/todos` を開く
- JSONが表示される

## 5-6. 追加APIを作る
次に `POST /todos` を実装する。

やること:
- リクエストの `title` を受け取る
- 空文字ならエラーを返す
- 新しいToDoを作って配列に追加する
- 作成したToDoを返す

ポイント:
- `id` は `Date.now()` か `最大id + 1` で作る
- `completed` は最初 `false`

## 5-7. 完了切り替えAPIを作る
`PATCH /todos/:id` を実装する。

やること:
- URLから `id` を受け取る
- 対象のToDoを探す
- `completed` を更新する
- 更新後のデータを返す

## 5-8. 削除APIを作る
`DELETE /todos/:id` を実装する。

やること:
- URLから `id` を受け取る
- 該当データを配列から削除する
- 正常終了レスポンスを返す

## 5-9. API完成時の確認項目
- `GET /todos` で一覧が返る
- `POST /todos` で新規追加できる
- `PATCH /todos/:id` で完了切り替えできる
- `DELETE /todos/:id` で削除できる

---

## 6. フロントエンド実装手順

## 6-1. React側で必要な画面を決める
今回は1画面で十分。

必要な表示:
- タイトル
- 入力欄
- 追加ボタン
- ToDo一覧
- 各ToDoの完了ボタン
- 各ToDoの削除ボタン

## 6-2. 最初は画面だけ作る
API接続前に、Reactだけで見た目を作る。

`App.jsx` で用意するもの:
- `useState` で入力値を管理
- 仮の `todos` 配列を表示
- `map()` で一覧を描画

この段階では、まずボタンを押しても動かなくてよい。

## 6-3. 一覧取得をつなぐ
次に、画面表示時にAPIから一覧を取得する。

やること:
- `useEffect` で初回読み込み時に `GET /todos` を呼ぶ
- 取得結果を `setTodos` で state に入れる

確認:
- サーバー側のデータが画面に表示される

## 6-4. 追加処理をつなぐ
入力欄と追加ボタンをAPIにつなぐ。

やること:
- 入力値を `title` として `POST /todos` に送る
- 成功したら一覧に反映する
- 入力欄を空に戻す

ポイント:
- 空文字送信はフロントでも防ぐ
- サーバー側でも防ぐ

## 6-5. 完了切り替えをつなぐ
各ToDoの完了ボタンから `PATCH /todos/:id` を呼ぶ。

やること:
- 対象ToDoの `completed` を反転した値で送る
- 成功したら一覧を更新する

## 6-6. 削除処理をつなぐ
削除ボタンから `DELETE /todos/:id` を呼ぶ。

やること:
- 指定したToDoを削除する
- 成功したら画面からも消す

---

## 7. React実装時の状態設計
最低限、次の state があれば進めやすい。

```js
const [todos, setTodos] = useState([]);
const [inputValue, setInputValue] = useState("");
```

余裕があれば追加:

```js
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
```

---

## 8. 画面実装の分割案
最初は `App.jsx` 1ファイルでもよいが、慣れてきたら分割すると見やすい。

### 分割例

```txt
react-app/src/
  app/
    App.jsx
  components/
    TodoForm.jsx
    TodoItem.jsx
    TodoList.jsx
```

### 各コンポーネントの役割
- `TodoForm.jsx`: 入力欄と追加ボタン
- `TodoItem.jsx`: 1件分の表示
- `TodoList.jsx`: 一覧表示

---

## 9. 詰まりやすいポイント

### CORSエラーが出る
- バックエンドで `cors()` を設定しているか確認する

### `req.body` が `undefined`
- `app.use(express.json())` を書いているか確認する

### 一覧が表示されない
- `GET /todos` のURLが正しいか確認する
- React側の `fetch` 先が `http://localhost:3001/todos` になっているか確認する

### 追加しても画面が変わらない
- API成功後に `setTodos` しているか確認する
- 再取得するか、追加結果を state に反映する

### id比較がうまくいかない
- `req.params.id` は文字列なので、数値に変換して比較する

---

## 10. 完成イメージ
完成時にできていればOKなこと:

- ページを開くとToDo一覧が見える
- 入力して追加できる
- 完了/未完了を切り替えられる
- 不要なToDoを削除できる

---

## 11. 余裕があれば次にやること

### ステップアップ案
1. JSONファイル保存に対応する
2. 件数表示を付ける
3. フィルター機能を付ける
4. 締切日を追加する
5. 優先度を追加する
6. 編集機能を追加する

---

## 12. 制作の進め方の目安
おすすめの進め方は次の通り。

### 1日目
- バックエンドの起動
- `GET /todos` 実装
- Reactで画面の見た目だけ作る

### 2日目
- `POST /todos`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

### 3日目
- ReactとAPI接続
- 見た目調整
- 動作確認

---

## 13. 最低限の完成ライン
まずはここまでできれば十分。

- Reactで一覧表示できる
- Node.jsでAPIが動く
- 追加、更新、削除ができる
- フロントとバックがつながっている

これは「初めてのバックエンド制作」としてかなり良い経験になる。

---

## 14. 実装チェックリスト
- [ ] `todo-api` フォルダを作成した
- [ ] `express` と `cors` をインストールした
- [ ] `server.js` を作成した
- [ ] `GET /todos` を作成した
- [ ] `POST /todos` を作成した
- [ ] `PATCH /todos/:id` を作成した
- [ ] `DELETE /todos/:id` を作成した
- [ ] Reactで入力欄を作成した
- [ ] Reactで一覧表示を作成した
- [ ] ReactからAPIを呼べた
- [ ] 追加後に画面が更新される
- [ ] 完了切り替えができる
- [ ] 削除ができる

---

## 15. 次にやると良いこと
手順書を見ながら実装を始めるときは、以下の順で進めると安定する。

1. `todo-api/server.js` を作る
2. `GET /todos` だけ先に完成させる
3. Reactで一覧を表示する
4. `POST /todos` を追加する
5. 完了切り替えと削除を作る

最初から完璧を目指さず、1機能ずつ完成させるのがコツ。
