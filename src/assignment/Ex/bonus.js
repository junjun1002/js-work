/**
 * 休眠ユーザーのコインを0にリセットする関数
 * @param {Array} users - ユーザーデータの配列
 * @returns {{updatedUsers: Array, dormantUsersCount: number}} 休眠ユーザーのコインを0にリセットしたユーザーデータの配列と休眠ユーザーの数
 */
export function updateDormantUsers(users) {
    // 休眠ユーザーの定義: 最終ログインから30日以上経過しているユーザー
    const dormantThreshold = 30; 
    // 休眠ユーザーの数をカウントする変数
    let dormantUsersCount = 0; 

    // ユーザーデータをループして休眠ユーザーのコインを0にリセットする
    const updatedUsers = users.map(user => {
        // 最終ログインから30日以上経過しているユーザーを休眠ユーザーとみなす
        if (user.lastLoginDaysAgo >= dormantThreshold) {
            // 休眠ユーザーの数をカウントする  
            dormantUsersCount++; 

            // 休眠ユーザーのコインを0にリセットする
            return {
                ...user,
                coin: 0, 
            };
        }
        return user; // 休眠ユーザーでない場合はそのまま返す
    });

    return { updatedUsers, dormantUsersCount };
}