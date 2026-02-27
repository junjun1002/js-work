# ==========================================
# React 学習（追加インストールなし / CDN版）
# ==========================================

## 0. フォルダとファイルを作る
プロジェクト直下に以下を作成：

```
react-cdn/
  index.html
  app.js
```

---

## 1. index.html（コピペ）
`react-cdn/index.html` を作成して、以下を貼り付け：

```html
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React CDN Practice</title>
  </head>
  <body>
    <div id="root"></div>

    <!-- React / ReactDOM（CDN） -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <!-- JSXをブラウザで動かすためのBabel（学習用） -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <!-- 自作コード -->
    <script type="text/babel" src="./app.js"></script>
  </body>
</html>
```

---

## 2. app.js（コピペ）
`react-cdn/app.js` を作成して、以下を貼り付け：

```jsx
function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <h1>React CDN Practice</h1>
      <p>count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        +1
      </button>

      <button onClick={() => setCount(0)} style={{ marginLeft: 8 }}>
        reset
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

---

## 3. 実行方法（追加インストールなし）
`react-cdn/index.html` を **ブラウザで開く**。

- エクスプローラーからダブルクリックでOK
- 変更したらブラウザをリロード

---

# ==========================================
# React 課題（CDN版）
# ==========================================

## 【課題1】Props（コンポーネント分割）
目的：親→子にデータを渡す

- `UserCard` コンポーネントを作る
- propsで `name` と `coin` を受け取って表示する

期待：
- Appの中で複数 `UserCard` を表示

---

## 【課題2】配列表示（map）
目的：配列をReactで表示する

- `users` 配列を用意する（例：[{id:1,name:"Taro",coin:100}, ...]）
- `users.map(...)` でリスト表示する
- `key={user.id}` を必ず付ける

---

## 【課題3】条件付きレンダリング
目的：ifっぽい表示切り替え

- coinが100未満のユーザーに「⚠ coin不足」を表示
- 100以上は何も表示しない

---

## 【課題4】フォーム（入力）
目的：useStateで入力値を管理

- inputを1つ作る（ユーザー名入力）
- 文字を入力すると画面にリアルタイム表示

---

## 【課題5】追加（配列を更新）
目的：配列 state の更新

- usersをstateで持つ（useState）
- 「追加」ボタンで新しいユーザーを1件追加
- 追加時は `setUsers([...users, newUser])`

---

## 【課題6】削除（イベントとstate更新）
目的：特定要素の削除

- 各ユーザー行に「削除」ボタン
- clickでそのユーザーを消す（filterで更新）

---

# できたらチェック
- [ ] Propsで表示できた
- [ ] mapで一覧表示できた
- [ ] keyの意味が分かった
- [ ] useStateでフォーム管理できた
- [ ] 追加/削除ができた