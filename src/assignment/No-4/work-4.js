/**
 * 指定されたユーザーにコインを加算する関数
 * @param {Array} users - ユーザーデータの配列
 * @param {number} userId - コインを加算するユーザーのID
 * @param {number} amount - 加算するコインの数
 * @returns {Array} コインを加算した後のユーザーデータの配列
 */
export function rewardUser(users, userId, amount) {
    // ユーザーデータをループして特定のユーザーを見つける
    const found = users.find(user => user.id === userId);
    // ユーザーが見つからない場合はエラーをスローする
    if (!found) {
        throw new Error("User not found");
    }

    // ユーザーが見つかった場合はコインを加算して新しいユーザーデータの配列を作成する
    const updatedUsers = users.map(user =>
        // ユーザーIDが一致する場合はコインを加算して新しいオブジェクトを返す
        user.id === userId
            ? { ...user, coin: user.coin + amount }
            : user
    );

    return updatedUsers;
}