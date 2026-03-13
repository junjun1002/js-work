/*
  このファイルは、Vite という開発ツールの設定を書く場所です。
  Vite は、Reactアプリをローカルで素早く起動したり、
  公開用のファイルを作ったりする役割を持っています。

  今は最低限の設定だけで、
  「このプロジェクトはReactを使います」と Vite に伝えています。

  初学者のうちは、このファイルを頻繁に編集することはあまりありません。
*/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // React用の機能をViteへ追加する設定
  plugins: [react()],
});
