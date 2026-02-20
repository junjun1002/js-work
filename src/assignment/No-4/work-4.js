import users from "../No-0/work-0.js";

 // 指定されたユーザーにコインを加算する関数
function rewardUser(users, userId, amount) {
    // ユーザーが見つかったかどうかを追跡するフラグ
    let found = false;

    // ユーザーを更新するための新しい配列を作成
    const updatedUsers = users.map((user) => {
        // ユーザーIDが一致する場合、コインを加算して新しいユーザーオブジェクトを返す
        if (user.id === userId) {
            found = true;
            return {
                ...user,
                coin: user.coin + amount
            };
        }

        return user;
    });

    // ユーザーが見つからなかった場合はエラーをスローする
    if (!found) {
        throw new Error(`ユーザーID ${userId} が見つかりませんでした。`);
    }

    return updatedUsers;
}

// ユーザー に 500 コインを加算する例
try {
  const updated = rewardUser(users, 2, 500);
  console.log(updated);
} catch (error) {
  console.error(error.message);
}