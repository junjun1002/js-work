/**
 * 休眠ユーザーのコインを0にリセットする関数
 * @param {Array} users - ユーザーデータの配列
 * @returns {Array} 休眠ユーザーのコインを0にリセットしたユーザーデータの配列
 */
export function updateDormantUsers(users) {
    // 休眠ユーザーの定義: 最終ログインから30日以上経過しているユーザー
    const dormantThreshold = 30; 
    // ユーザーデータをループして休眠ユーザーのコインを0にリセットする
    return users.map(user => {
        // 最終ログインから30日以上経過しているユーザーを休眠ユーザーとみなす
        if (user.lastLoginDaysAgo >= dormantThreshold) {
            // 休眠ユーザーのコインを0にリセットする
            return {
                ...user,
                coin: 0, 
            };
        }
        return user; // 休眠ユーザーでない場合はそのまま返す
    });
}