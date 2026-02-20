/**
 * 指定されたユーザーにコインを加算する関数
 * @param {Array} users - ユーザーデータの配列
 * @param {number} userId - コインを加算するユーザーのID
 * @param {number} amount - 加算するコインの数
 * @returns {Array} コインを加算した後のユーザーデータの配列
 */
export function rewardUser(users, userId, amount) {
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