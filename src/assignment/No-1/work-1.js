/** 
 * ユーザーデータのコインの合計を計算する関数
 * @param {Array} users - ユーザーデータの配列
 * @returns {number} コインの合計
 */ 
export function calculateTotalCoins(users) {
    // ユーザーデータのコインの合計を計算するための変数
    let totalCoins = 0;

    // ユーザーデータをループしてコインの合計を計算する
    users.forEach(user => {
        totalCoins += user.coin;
    });

    // コインの合計を返す
    return totalCoins;
}