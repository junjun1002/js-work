import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Viteの設定ファイル
// react() を指定することで、JSXを使ったReactアプリを動かせるようにする
export default defineConfig({
  plugins: [react()],
});
