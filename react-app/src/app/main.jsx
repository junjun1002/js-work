import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// index.html の id="root" を起点に、Reactアプリ全体を画面へ描画する
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode は開発中に問題へ気づきやすくするための補助機能
  <React.StrictMode>
    {/* App はこのアプリの一番大きな親コンポーネント */}
    <App />
  </React.StrictMode>
);
