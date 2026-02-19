# 🚀 Node.js + VSCode + Git + GitHub(SSH) 環境構築手順（Windows）

---

## ✅ 1. Node.js インストール確認

```bash
node -v
npm -v
```

バージョンが表示されない場合は  
https://nodejs.org から **LTS版** をインストール。

---

## ✅ 2. プロジェクト作成

```bash
mkdir js-work
cd js-work
npm init -y
```

`index.js` を作成：

```js
console.log("Hello Node!");
```

実行確認：

```bash
node index.js
```

---

## ✅ 3. Git 初期化

```bash
git init
```

`.gitignore` 作成：

```
node_modules/
.env
```

初回コミット：

```bash
git add .
git commit -m "Initial commit"
```

---

## ✅ 4. GitHub リポジトリ作成

GitHubで新規リポジトリ作成（空でOK）

リモート追加（SSH）：

```bash
git remote add origin git@github.com:USERNAME/REPO.git
git remote -v
```

---

## ✅ 5. GitHub専用 SSH鍵 作成

```bash
ssh-keygen -t ed25519 -C "your@email.com" -f %USERPROFILE%\.ssh\id_ed25519_github
```

---

## ✅ 6. ssh-agent 起動（管理者コマンドプロンプト）

```bash
sc config ssh-agent start=auto
net start ssh-agent
```

---

## ✅ 7. 鍵を追加

```bash
ssh-add %USERPROFILE%\.ssh\id_ed25519_github
ssh-add -l
```

---

## ✅ 8. GitHubに公開鍵登録

```bash
cat %USERPROFILE%\.ssh\id_ed25519_github.pub
```

出力された1行をコピーし、

GitHub  
→ Settings  
→ SSH and GPG keys  
→ New SSH key  

に登録。

---

## ✅ 9. SSH接続テスト

```bash
ssh -T git@github.com
```

成功例：

```
Hi USERNAME! You've successfully authenticated...
```

---

## ✅ 10. GitでWindows OpenSSHを使用する設定

```bash
git config --global core.sshCommand "C:/Windows/System32/OpenSSH/ssh.exe"
```

確認：

```bash
git config --global --get core.sshCommand
```

---

## ✅ 11. 初回 push

```bash
git push -u origin master
```

---

# 🎯 セットアップ完了状態

- ✔ Node.js 実行可能
- ✔ npm 使用可能
- ✔ Git 初期化済み
- ✔ GitHub SSH 接続成功
- ✔ リモート push 成功

---

## 🧠 状態確認コマンド

```bash
git status
git log --oneline
git branch
git remote -v
```
