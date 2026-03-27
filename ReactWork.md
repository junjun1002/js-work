# ==========================================
# ToDoアプリ 実装手順書
# React + JavaScript + Node.js 初学者向け
# ==========================================

## 0. この手順書のゴール
この手順書では、React と Node.js を使って、基本的な ToDoアプリを1つ完成させる。

作る機能は次の4つ。

- ToDo一覧を表示する
- ToDoを追加する
- ToDoの完了状態を切り替える
- ToDoを削除する

このアプリを作ることで、次の流れを体験できる。

- Reactで画面を作る
- Node.js + ExpressでAPIを作る
- ReactからAPIを呼ぶ
- フロントエンドとバックエンドをつなぐ

---

## 1. 最初に理解しておくこと

### Reactとは
Reactは、画面を作るためのJavaScriptライブラリ。

今回の役割:
- 入力欄を表示する
- ボタンを表示する
- ToDo一覧を画面に並べる
- ボタンを押したときに画面を更新する

### Node.jsとは
Node.jsは、JavaScriptをブラウザの外でも動かせる実行環境。

今回の役割:
- ToDoデータを管理する
- Reactから送られたリクエストを受け取る
- ToDo一覧や追加結果を返す

### Expressとは
Expressは、Node.jsでAPIサーバーを作りやすくするライブラリ。

今回の役割:
- `GET /todos`
- `POST /todos`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

のようなAPIを簡単に作ること。

### APIとは
APIは、プログラム同士がデータをやりとりするための窓口。

今回のイメージ:
- Reactが「ToDo一覧をください」とAPIにお願いする
- Node.jsがToDo一覧を返す

---

## 2. 今回の完成イメージ

### 画面でできること
- ページを開くとToDo一覧が見える
- 入力欄に文字を入れて追加できる
- 完了ボタンで状態を切り替えられる
- 削除ボタンで消せる

### データの形
1件のToDoは、次のような形で扱う。

```js
{
  id: 1,
  title: "牛乳を買う",
  completed: false
}
```

意味:
- `id`: ToDoを区別する番号
- `title`: ToDoの内容
- `completed`: 完了したかどうか

---

## 3. フォルダ構成
この手順書では、次のような構成で進める。

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

意味:
- `react-app`: フロントエンドのReactアプリ
- `todo-api`: バックエンドのNode.jsアプリ

---

## 4. 実装の全体順序
初学者は、次の順番で進めると詰まりにくい。

1. バックエンドのフォルダを作る
2. Node.js + ExpressでAPIを作る
3. APIが単体で動くか確認する
4. Reactで画面を作る
5. ReactからAPIを呼ぶ
6. 追加、完了切り替え、削除をつなぐ

---

## 5. バックエンドを作る

## 5-1. `todo-api` フォルダを作る
まず、プロジェクト直下に `todo-api` というフォルダを作る。

完成イメージ:

```txt
js/
  todo-api/
```

---

## 5-2. `todo-api` に移動する
PowerShellで次を実行する。

```powershell
cd C:\Users\junya.ueno\Documents\work\js\todo-api
```

もしまだ `todo-api` フォルダがない場合は、先に作成する。

```powershell
mkdir C:\Users\junya.ueno\Documents\work\js\todo-api
cd C:\Users\junya.ueno\Documents\work\js\todo-api
```

ここでやること:
- バックエンド用の作業場所に入る

---

## 5-3. Node.jsプロジェクトを初期化する
次を実行する。

```powershell
npm init -y
```

このコマンドの意味:
- `package.json` という設定ファイルを作る
- Node.jsプロジェクトとして使える状態にする

成功すると、`todo-api` の中に `package.json` ができる。

確認ポイント:
- `todo-api/package.json` が存在する

---

## 5-4. 必要なライブラリを入れる
次を実行する。

```powershell
npm install express cors
```

このコマンドの意味:
- `express`: APIサーバーを作る
- `cors`: ReactからAPIへアクセスできるようにする

確認ポイント:
- `node_modules` フォルダが作られる
- `package.json` に依存関係が追加される

---

## 5-5. `server.js` を作成する
`todo-api` の中に `server.js` を作る。

ファイル:
- `todo-api/server.js`

まずは次のコードを書く。

```js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ToDo API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

### このコードの意味
- `require("express")`
  Expressを読み込む
- `require("cors")`
  CORS設定用のライブラリを読み込む
- `const app = express()`
  サーバー本体を作る
- `app.use(cors())`
  Reactからアクセスできるようにする
- `app.use(express.json())`
  JSON形式のデータを受け取れるようにする
- `app.get("/", ...)`
  `http://localhost:3001/` にアクセスされたときの処理
- `app.listen(...)`
  サーバーを起動する

---

## 5-6. サーバーを起動する
`todo-api` フォルダで次を実行する。

```powershell
node server.js
```

成功すると、ターミナルに次のような表示が出る。

```txt
Server is running on http://localhost:3001
```

### 動作確認
ブラウザで次を開く。

```txt
http://localhost:3001
```

`ToDo API is running` と表示されれば成功。

### ここで確認すること
- ターミナルにエラーが出ていない
- ブラウザで文字が表示される

---

## 5-7. 仮のToDoデータを用意する
次は、サーバーの中に仮データを置く。

`server.js` を次のように変更する。

```js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, title: "買い物に行く", completed: false },
  { id: 2, title: "課題を進める", completed: true }
];

app.get("/", (req, res) => {
  res.send("ToDo API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

### `let todos = [...]` の意味
- ToDo一覧を配列で保存している
- 今回はDBを使わず、メモリ上で管理する

注意:
- サーバーを再起動するとデータは元に戻る
- これは学習用としては問題ない

---

## 5-8. ToDo一覧を返すAPIを作る
次は `GET /todos` を作る。

`server.js` に次を追加する。

```js
app.get("/todos", (req, res) => {
  res.json(todos);
});
```

`server.js` 全体はこうなる。

```js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, title: "買い物に行く", completed: false },
  { id: 2, title: "課題を進める", completed: true }
];

app.get("/", (req, res) => {
  res.send("ToDo API is running");
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

### `res.json(todos)` の意味
- JavaScriptの配列をJSON形式で返す

### 動作確認
ブラウザで次を開く。

```txt
http://localhost:3001/todos
```

ToDoの配列が表示されれば成功。

---

## 5-9. ToDo追加APIを作る
次は `POST /todos` を作る。

`server.js` に次を追加する。

```js
app.post("/todos", (req, res) => {
  const title = req.body.title;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "title is required" });
  }

  const newTodo = {
    id: Date.now(),
    title: title.trim(),
    completed: false
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});
```

### このコードの意味
- `req.body.title`
  Reactや他のクライアントが送ってきた `title` を受け取る
- `!title || !title.trim()`
  空文字を防ぐ
- `Date.now()`
  現在時刻を使って id を作る
- `todos.push(newTodo)`
  配列に新しいToDoを追加する
- `res.status(201).json(newTodo)`
  作成成功として新しいToDoを返す

### 動作確認の考え方
この時点では、後でReactから呼ぶので、ここではコードが書けていれば十分。

---

## 5-10. 完了切り替えAPIを作る
次は `PATCH /todos/:id` を作る。

`server.js` に次を追加する。

```js
app.patch("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const completed = req.body.completed;

  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).json({ message: "todo not found" });
  }

  todo.completed = completed;

  res.json(todo);
});
```

### このコードの意味
- `req.params.id`
  URLの `:id` を受け取る
- `Number(...)`
  文字列を数値に変換する
- `find(...)`
  該当するToDoを探す
- `todo.completed = completed`
  完了状態を更新する

---

## 5-11. 削除APIを作る
次は `DELETE /todos/:id` を作る。

`server.js` に次を追加する。

```js
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const exists = todos.some((item) => item.id === id);

  if (!exists) {
    return res.status(404).json({ message: "todo not found" });
  }

  todos = todos.filter((item) => item.id !== id);

  res.json({ message: "deleted" });
});
```

### このコードの意味
- `some(...)`
  対象のToDoがあるか確認する
- `filter(...)`
  指定id以外だけ残して、新しい配列を作る

---

## 5-12. バックエンド完成版コード
ここまで終わると、`server.js` は次のようになる。

```js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, title: "買い物に行く", completed: false },
  { id: 2, title: "課題を進める", completed: true }
];

app.get("/", (req, res) => {
  res.send("ToDo API is running");
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const title = req.body.title;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "title is required" });
  }

  const newTodo = {
    id: Date.now(),
    title: title.trim(),
    completed: false
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

app.patch("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const completed = req.body.completed;

  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).json({ message: "todo not found" });
  }

  todo.completed = completed;

  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const exists = todos.some((item) => item.id === id);

  if (!exists) {
    return res.status(404).json({ message: "todo not found" });
  }

  todos = todos.filter((item) => item.id !== id);

  res.json({ message: "deleted" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

### ここで確認すること
- `node server.js` で起動できる
- `http://localhost:3001/todos` で一覧が見える

---

## 6. フロントエンドを作る

## 6-1. React側の担当を理解する
React側の役割は次の通り。

- 入力欄を表示する
- ToDo一覧を表示する
- APIからデータを取得する
- 追加、完了切り替え、削除の操作を送る

---

## 6-2. 最初は画面だけ作る
最初からAPI通信まで一気にやらず、まずは見た目だけ作る。

対象ファイル:
- `react-app/src/app/App.jsx`

まずは次のコードを書く。

```jsx
import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos] = useState([
    { id: 1, title: "買い物に行く", completed: false },
    { id: 2, title: "課題を進める", completed: true }
  ]);

  return (
    <main style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h1>ToDoアプリ</h1>

      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="やることを入力"
        />
        <button style={{ marginLeft: "8px" }}>追加</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "8px" }}>
            <span>
              {todo.completed ? "完了" : "未完了"} / {todo.title}
            </span>
            <button style={{ marginLeft: "8px" }}>切り替え</button>
            <button style={{ marginLeft: "8px" }}>削除</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
```

### このコードの意味
- `useState("")`
  入力欄の文字を管理する
- `value={inputValue}`
  入力欄の値を state と同期する
- `onChange={...}`
  入力されたら state を更新する
- `todos.map(...)`
  配列の件数分だけ一覧を表示する
- `key={todo.id}`
  Reactが一覧を正しく管理するために必要

### ここで確認すること
- 入力欄が表示される
- 仮のToDoが2件表示される
- 入力欄に文字を打てる

---

## 6-3. `useState` を理解する
`useState` は、画面で変わる値を管理するための仕組み。

例:

```jsx
const [inputValue, setInputValue] = useState("");
```

意味:
- `inputValue`: 現在の値
- `setInputValue`: 値を更新する関数

入力欄で使うとこうなる。

```jsx
<input
  value={inputValue}
  onChange={(event) => setInputValue(event.target.value)}
/>
```

意味:
- 入力欄の値は `inputValue`
- 文字が変わるたびに `setInputValue(...)` が呼ばれる

---

## 6-4. APIから一覧を取得する準備をする
次は、仮データではなくバックエンドからToDo一覧を取る。

`App.jsx` で `useEffect` を使う。

```jsx
import { useEffect, useState } from "react";
```

### `useEffect` とは
画面が表示されたあとに処理をしたいときに使う。

今回の用途:
- ページを開いた直後にToDo一覧を取得する

---

## 6-5. 一覧取得を実装する
`App.jsx` を次のように書き換える。

```jsx
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:3001/todos");
    const data = await response.json();
    setTodos(data);
  };

  return (
    <main style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h1>ToDoアプリ</h1>

      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="やることを入力"
        />
        <button style={{ marginLeft: "8px" }}>追加</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "8px" }}>
            <span>
              {todo.completed ? "完了" : "未完了"} / {todo.title}
            </span>
            <button style={{ marginLeft: "8px" }}>切り替え</button>
            <button style={{ marginLeft: "8px" }}>削除</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
```

### このコードの意味
- `useEffect(() => { ... }, [])`
  最初の1回だけ処理を実行する
- `fetch(...)`
  APIへアクセスする
- `await response.json()`
  返ってきたJSONをJavaScriptのデータに変換する
- `setTodos(data)`
  取得した一覧を画面に反映する

### ここで確認すること
- バックエンドを起動した状態で画面を開く
- APIのToDo一覧が画面に表示される

---

## 6-6. ToDo追加を実装する
次は、追加ボタンを押したときにAPIへ送る。

`App.jsx` に次の関数を追加する。

```jsx
const handleAddTodo = async () => {
  if (!inputValue.trim()) {
    return;
  }

  const response = await fetch("http://localhost:3001/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: inputValue
    })
  });

  const newTodo = await response.json();

  setTodos([...todos, newTodo]);
  setInputValue("");
};
```

追加ボタンを次のように変更する。

```jsx
<button onClick={handleAddTodo} style={{ marginLeft: "8px" }}>
  追加
</button>
```

### このコードの意味
- `if (!inputValue.trim())`
  空文字の追加を防ぐ
- `method: "POST"`
  追加APIを呼ぶ
- `headers`
  JSONを送ることを伝える
- `body: JSON.stringify(...)`
  JavaScriptの値をJSON文字列に変換して送る
- `setTodos([...todos, newTodo])`
  追加されたToDoを画面に反映する
- `setInputValue("")`
  入力欄を空に戻す

### ここで確認すること
- 入力して追加ボタンを押すと一覧に増える
- 追加後に入力欄が空になる

---

## 6-7. 完了切り替えを実装する
各ToDoのボタンで完了状態を切り替える。

`App.jsx` に次の関数を追加する。

```jsx
const handleToggleTodo = async (id, currentCompleted) => {
  const response = await fetch(`http://localhost:3001/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      completed: !currentCompleted
    })
  });

  const updatedTodo = await response.json();

  setTodos(
    todos.map((todo) => {
      if (todo.id === id) {
        return updatedTodo;
      }

      return todo;
    })
  );
};
```

切り替えボタンを次のように変更する。

```jsx
<button
  onClick={() => handleToggleTodo(todo.id, todo.completed)}
  style={{ marginLeft: "8px" }}
>
  切り替え
</button>
```

### このコードの意味
- `!currentCompleted`
  今の値を反転する
- `PATCH`
  一部だけ更新するときに使う
- `todos.map(...)`
  更新対象だけ差し替える

### ここで確認すること
- ボタンを押すと `完了` と `未完了` が切り替わる

---

## 6-8. 削除を実装する
最後に削除ボタンをつなぐ。

`App.jsx` に次の関数を追加する。

```jsx
const handleDeleteTodo = async (id) => {
  await fetch(`http://localhost:3001/todos/${id}`, {
    method: "DELETE"
  });

  setTodos(todos.filter((todo) => todo.id !== id));
};
```

削除ボタンを次のように変更する。

```jsx
<button
  onClick={() => handleDeleteTodo(todo.id)}
  style={{ marginLeft: "8px" }}
>
  削除
</button>
```

### このコードの意味
- `DELETE`
  削除APIを呼ぶ
- `filter(...)`
  削除したid以外だけ残す

### ここで確認すること
- 削除ボタンを押すとそのToDoだけ消える

---

## 6-9. フロントエンド完成版コード
ここまで終わると、`App.jsx` は次のようになる。

```jsx
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:3001/todos");
    const data = await response.json();
    setTodos(data);
  };

  const handleAddTodo = async () => {
    if (!inputValue.trim()) {
      return;
    }

    const response = await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: inputValue
      })
    });

    const newTodo = await response.json();

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const handleToggleTodo = async (id, currentCompleted) => {
    const response = await fetch(`http://localhost:3001/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: !currentCompleted
      })
    });

    const updatedTodo = await response.json();

    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return updatedTodo;
        }

        return todo;
      })
    );
  };

  const handleDeleteTodo = async (id) => {
    await fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE"
    });

    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h1>ToDoアプリ</h1>

      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="やることを入力"
        />
        <button onClick={handleAddTodo} style={{ marginLeft: "8px" }}>
          追加
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "8px" }}>
            <span>
              {todo.completed ? "完了" : "未完了"} / {todo.title}
            </span>
            <button
              onClick={() => handleToggleTodo(todo.id, todo.completed)}
              style={{ marginLeft: "8px" }}
            >
              切り替え
            </button>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              style={{ marginLeft: "8px" }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
```

---

## 7. 実行時の確認ポイント

### バックエンド
- `todo-api` フォルダで `node server.js` を実行している
- `http://localhost:3001/todos` が開ける

### フロントエンド
- `react-app` を起動している
- ページを開くとToDo一覧が表示される

---

## 8. よくあるエラー

### `Cannot GET /todos`
原因:
- `app.get("/todos", ...)` がない
- サーバーを保存後に再起動していない

### `req.body` が `undefined`
原因:
- `app.use(express.json())` がない

### CORSエラー
原因:
- `app.use(cors())` がない

### 一覧が出ない
確認:
- バックエンドが起動しているか
- `fetch("http://localhost:3001/todos")` のURLが正しいか
- ブラウザの開発者ツールでエラーが出ていないか

### 追加しても変わらない
確認:
- `handleAddTodo` がボタンに設定されているか
- `setTodos([...todos, newTodo])` が書かれているか

---

## 9. 最低限の完成ライン
次ができれば、最初のToDoアプリとして十分。

- 一覧表示ができる
- 追加ができる
- 完了切り替えができる
- 削除ができる
- ReactとNode.jsがつながっている

---

## 10. 実装チェックリスト
- [ ] `todo-api` フォルダを作成した
- [ ] `npm init -y` を実行した
- [ ] `express` と `cors` をインストールした
- [ ] `server.js` を作成した
- [ ] `GET /todos` を作成した
- [ ] `POST /todos` を作成した
- [ ] `PATCH /todos/:id` を作成した
- [ ] `DELETE /todos/:id` を作成した
- [ ] Reactで入力欄を作成した
- [ ] Reactで一覧表示を作成した
- [ ] `useEffect` で一覧取得できた
- [ ] 追加処理をつなげた
- [ ] 完了切り替えをつなげた
- [ ] 削除処理をつなげた

---

## 11. 余裕があれば次にやること
- JSONファイル保存に対応する
- 編集機能を追加する
- 未完了のみ表示する
- 件数を表示する
- 見た目を整える

---

## 12. 学習のコツ
- 最初から全部つなげようとしない
- まずバックエンドだけ動かす
- 次にReactだけで画面を作る
- 最後にAPI接続する

この順番で進めると、どこでエラーが出ているか判断しやすい。
