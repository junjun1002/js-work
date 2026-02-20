/**
 * 全ユーザーに指定されたコインを加算する関数
 * @param {Array} users - ユーザーデータの配列
 * @param {number} coinsToAdd - 加算するコインの数
 * @returns {Array} コインを加算した後のユーザーデータの配列
 */
export function addCoinsToUsers(users, coinsToAdd) {
  // ユーザーデータをループしてコインを加算する
  const results = users.map((user) => {
    return {
      ...user,
      coin: user.coin + coinsToAdd
    };
  });
  return results;
}
