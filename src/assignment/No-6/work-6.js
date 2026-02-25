/**
 * ユーザーが持っているアイテムの種類ごとに、そのアイテムを持っているユーザーの数を集計する関数
 * @param {Array<{id: number, name: string, coin: number, level: number, lastLoginDaysAgo: number, items: string[]}>} users 
 * @return {Object} アイテムごとのユーザー数を表すオブジェクト
 * 例: { potion: 2, sword: 1, shield: 1 }
 * 
 * ユーザーデータの配列を受け取り、各ユーザーが持っているアイテムの種類ごとに、そのアイテムを持っているユーザーの数を集計して返す関数です。
 * reduceを使用して、ユーザーデータの配列を処理し、各ユーザーのitems配列をforEachでループして、アイテムごとにカウントを増やしていきます。
 */
export function aggregateItems(users) {
    // reduceを使用してアイテムごとのユーザー数を集計
    return users.reduce((acc, user) => {
        // ユーザーのitems配列をループして、アイテムごとにカウントを増やす
        user.items.forEach(item => {
            acc[item] = (acc[item] || 0) + 1;
        });
        return acc;
    }, {});
}