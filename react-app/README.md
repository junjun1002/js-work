# React App Scaffold

このフォルダは、React を実務寄りの形で学ぶための最小構成です。
まだ機能はほとんど入っておらず、課題を進めながら自分で中身を作っていく前提です。

## このフォルダの役割

- `index.html`
  ブラウザで最初に読み込まれるHTMLです。Reactの画面を差し込む土台です。

- `src/app/main.jsx`
  Reactアプリの開始地点です。`App.jsx` を画面へ表示する役割があります。

- `src/app/App.jsx`
  画面全体の親コンポーネントです。課題で作る画面や部品は、ここから組み立てていきます。

- `package.json`
  このプロジェクトで使うライブラリや、起動コマンドを管理するファイルです。

- `vite.config.js`
  Vite という開発ツールの設定ファイルです。今はReactを使うための最低限の設定だけ入っています。

## 起動方法

1. `cd react-app`
2. `npm install`
3. `npm run dev`

## package.json の見方

- `scripts.dev`
  開発用サーバーを起動するコマンドです。

- `scripts.build`
  公開用のファイルを作るコマンドです。

- `scripts.preview`
  build した結果をローカルで確認するコマンドです。

- `dependencies`
  アプリ本体で使うライブラリです。ここでは `react` と `react-dom` が入っています。

- `devDependencies`
  開発を助けるためのツールです。ここでは `vite` と React 用プラグインが入っています。
