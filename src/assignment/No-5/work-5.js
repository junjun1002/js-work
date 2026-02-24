/**
 * レベル帯ごとにユーザー数を集計する関数
 * レベル帯の定義:
 * - low: レベル1〜5
 * - mid: レベル6〜15
 * - high: レベル16以上
 * @param {Array} users - ユーザーデータの配列
 * @returns {Object} レベル帯ごとのユーザー数を表すオブジェクト
 * 例: { low: 3, mid: 5, high: 2 }  
 */
export function aggregateByLevelRange(users) {
    // reduceを使用してレベル帯ごとのユーザー数を集計
    return users.reduce((acc, user) => {
        // ユーザーのレベルに基づいてレベル帯を決定
        const range =
            // レベル帯の定義に基づいて範囲を決定 
            user.level <= 5
                ? "low"
                : user.level <= 15
                    ? "mid"
                    : "high";

        // レベル帯ごとにユーザー数をカウント
        acc[range] = (acc[range] || 0) + 1;
        
        // 集計結果を返す
        return acc;
    }, {});
}