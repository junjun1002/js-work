/*
  このファイルは、Reactアプリの開始地点です。
  アプリを起動したときに、最初に読み込まれるJavaScriptファイルです。

  役割はシンプルで、
  App.jsx で作った画面を index.html の root に表示することです。

  どの画面を一番最初に出すかを決める入口だと考えると分かりやすいです。
*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// index.html の id="root" を起点に、Reactアプリ全体を画面へ描画する
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode は開発中に問題へ気づきやすくするための補助機能
  <React.StrictMode>
    {/* App はこのアプリ全体の親コンポーネント */}
    <App />
  </React.StrictMode>
);
