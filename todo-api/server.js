/**
 * 簡単なToDo APIサーバー
 * - GET /todos: ToDoの一覧を取得
 * - POST /todos: 新しいToDoを追加
 */

// 必要なモジュールをインポート
const express = require("express");
const cors = require("cors");

// Expressアプリケーションを作成
const app = express();
// サーバーがリッスンするポート番号
const PORT = 3001;

// CORSを有効にし、JSONリクエストのパースを設定
app.use(cors());
// JSON形式のリクエストボディをパースするミドルウェア
app.use(express.json());

// ToDoのデータを格納する配列（簡易的なデータストア）
let todos = [
  { id: 1, title: "買い物に行く", completed: false },
  { id: 2, title: "課題を進める", completed: true }
];

// ルートエンドポイント
app.get("/", (req, res) => {
  res.send("ToDo API is running");
});

// ToDoの一覧を取得するエンドポイント
app.get("/todos", (req, res) => {
  res.json(todos);
});

// 新しいToDoを追加するエンドポイント
app.post("/todos", (req, res) => {
  const title = req.body.title;

  // タイトルが存在しない、または空白のみの場合はエラーを返す
  if (!title || !title.trim()) {
    return res.status(400).json({ message: "title is required" });
  }

  // 新しいToDoオブジェクトを作成
  const newTodo = {
    id: Date.now(),
    title: title.trim(),
    completed: false
  };

  // 新しいToDoを配列に追加
  todos.push(newTodo);

  // 作成したToDoをクライアントに返す
  res.status(201).json(newTodo);
});

// ToDoの完了状態を更新するエンドポイント
app.patch("/todos/:id", (req, res) => {
  // URLパラメータからIDを取得し、リクエストボディから完了状態を取得
  const id = Number(req.params.id);
  const completed = req.body.completed;

  // completedがbooleanでない場合はエラーを返す
  const todo = todos.find((item) => item.id === id);

  // IDに対応するToDoが存在しない場合はエラーを返す
  if (!todo) {
    return res.status(404).json({ message: "todo not found" });
  }

  // ToDoの完了状態を更新
  todo.completed = completed;

  // 更新したToDoをクライアントに返す
  res.json(todo);
});

// ToDoを削除するエンドポイント
app.delete("/todos/:id", (req, res) => {
  // URLパラメータからIDを取得
  const id = Number(req.params.id);
  // IDに対応するToDoが存在するか確認
  const exists = todos.some((item) => item.id === id);
  // 存在しない場合はエラーを返す
  if (!exists) {
    return res.status(404).json({ message: "todo not found" });
  }
  // IDに対応するToDoを配列から削除
  todos = todos.filter((item) => item.id !== id);
  // 削除完了のメッセージをクライアントに返す
  res.json({ message: "deleted" });
});

// サーバーを起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});