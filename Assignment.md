# ==========================================
# Git 実践課題（バックエンド案件想定）
# ==========================================

# ------------------------------------------
# 【課題1】基本フロー練習
# ------------------------------------------

# 目的：
# ブランチを切って、変更して、マージする流れを体験する

# 手順：

1. mainブランチに移動
   git switch main

2. 最新取得
   git pull

3. feature/add-console-log ブランチを作成
   git switch -c feature/add-console-log

4. index.js に console.log("feature branch"); を追加

5. 変更確認
   git status
   git diff

6. 変更をコミット
   git add .
   git commit -m "feat: add console log"

7. push
   git push -u origin feature/add-console-log

8. mainに戻る
   git switch main

9. マージ
   git merge feature/add-console-log


# ------------------------------------------
# 【課題2】コンフリクト体験
# ------------------------------------------

# 目的：
# コンフリクトを意図的に発生させて解決する

1. mainブランチで index.js に
   console.log("main change");
   を追加してコミット

2. feature/conflict-test ブランチを作成

3. 同じ行を別の内容に変更
   console.log("feature change");

4. mainに戻る

5. mainでも同じ行を別内容に変更

6. feature/conflict-test を main にマージ

7. コンフリクトを解消し、再コミット


# ------------------------------------------
# 【課題3】stash練習
# ------------------------------------------

# 目的：
# 作業中にブランチを切り替える状況を再現

1. mainで適当にコード変更（コミットしない）

2. stashで退避
   git stash

3. 新しいブランチ作成
   git switch -c feature/test-stash

4. mainに戻る

5. stash復元
   git stash pop


# ------------------------------------------
# 【課題4】履歴操作
# ------------------------------------------

# 目的：
# コミットの修正を体験

1. 適当にコミットを2回作る

2. 直前コミットを修正
   git commit --amend

3. 1つ前に戻る（履歴残す）
   git reset --soft HEAD~1

4. 完全に戻す（注意）
   git reset --hard HEAD~1


# ------------------------------------------
# 【課題5】実務風フロー
# ------------------------------------------

# 目的：
# チーム開発を想定した流れ

1. mainを最新にする
   git switch main
   git pull

2. feature/login-api ブランチ作成
   git switch -c feature/login-api

3. 仮のログインAPI実装

4. コミット
   git add .
   git commit -m "feat: add login API"

5. push
   git push -u origin feature/login-api

6. Pull Requestを作る（GitHub上）


# ------------------------------------------
# 【ボーナス課題】
# ------------------------------------------

# git log --oneline --graph --all を使って
# ブランチ構造を視覚的に確認してみる

# どのコミットがどのブランチか説明できるようにする
