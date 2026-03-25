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

    <!-- React / ReactDOM（CDN: 再現性のためバージョン固定） -->
    <script crossorigin src="https://unpkg.com/react@18.2.0/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"></script>

    <!-- JSXをブラウザで動かすためのBabel（学習用） -->
    <script src="https://unpkg.com/@babel/standalone@7.24.0/babel.min.js"></script>

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
`file://` 直開きだと CORS で `app.js` が読めないことがあるため、ローカルHTTPサーバーで開く。

1. PowerShellで `react-cdn` に移動
   `cd C:\Users\junya.ueno\Documents\work\js\react-cdn`
2. 次のどちらかを実行
   - Pythonがある場合: `python -m http.server 5500`
   - Pythonがない場合: `npx serve -l 5500`
3. ブラウザで `http://localhost:5500` を開く
4. 変更したらブラウザをリロード

- CDN読み込みのためインターネット接続が必要（オフライン環境では動作しない）

### サーバーの閉じ方
- サーバーを起動したターミナルで `Ctrl + C` を押す
- `Terminate batch job (Y/N)?` と表示されたら `Y` を入力して Enter

### なぜ閉じるのか
- ポート（例: 5500）を占有し続け、次回起動時に競合しやすくなる
- 不要なバックグラウンドプロセスが残り、PCリソースを使い続ける
- 意図しない公開状態を避ける（セキュリティ・運用面）

---

# ==========================================
# React 課題（CDN版）
# ==========================================

## 【課題1】Props（コンポーネント分割）
目的：親→子にデータを渡す

- `UserCard` コンポーネントを作る
- propsで `name` と `coin` を受け取って表示する
- Appの中で複数 `UserCard` を表示する

合格基準：
- 2件以上の `UserCard` が表示される
- 各カードで名前とcoinがprops由来で表示される

---

## 【課題2】配列表示（map）
目的：配列をReactで表示する

- `users` 配列を用意する（例：`[{ id: 1, name: "Taro", coin: 100 }, ...]`）
- `users.map(...)` でリスト表示する
- `key={user.id}` を必ず付ける

合格基準：
- `users` の件数分だけUIが表示される
- コンソールに key 警告が出ない

---

## 【課題3】条件付きレンダリング
目的：ifっぽい表示切り替え

- coinが100未満のユーザーに「⚠ coin不足」を表示
- 100以上は何も表示しない

合格基準：
- coin 99以下のユーザーだけ警告が表示される
- coin 100以上のユーザーには警告が表示されない

---

## 【課題4】フォーム（入力）
目的：useStateで入力値を管理

- inputを1つ作る（ユーザー名入力）
- 文字を入力すると画面にリアルタイム表示

合格基準：
- 入力中の文字列がstate経由で即時反映される

---

## 【課題5】追加（配列を更新）
目的：配列 state の更新

- usersをstateで持つ（`useState`）
- 「追加」ボタンで新しいユーザーを1件追加
- 追加時は `setUsers([...users, newUser])`
- `newUser` は以下ルールで作る
  - `id`: 既存最大id + 1（`users` が空なら 1 から開始）
  - `name`: input値を使用（空文字は追加しない）
  - `coin`: 100 で固定（初期値）
- 追加後は input を空文字に戻す（推奨）

合格基準：
- 空入力では追加されない
- 追加のたびにidが重複しない
- 追加後に一覧に即反映される

---

## 【課題6】削除（イベントとstate更新）
目的：特定要素の削除

- 各ユーザー行に「削除」ボタン
- clickでそのユーザーを消す（`filter` で更新）

合格基準：
- クリックした行だけ削除される
- 他の行は残る

---

# できたらチェック
- [ ] Propsで表示できた
- [ ] mapで一覧表示できた
- [ ] keyの意味が分かった
- [ ] useStateでフォーム管理できた
- [ ] 追加/削除ができた
- [ ] 課題5でid重複なし・空入力追加なしを満たした


