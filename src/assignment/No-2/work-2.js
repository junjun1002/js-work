/** 
 * 抽出条件からユーザーを取得
 * 
    使用例:
    const filteredUsers = getFilteredUsers(users, user => user.coin > 1000);

    ---

    @param {Array} users - ユーザーデータの配列
    @param {Function} conditions - ユーザーデータをフィルタリングするための条件を指定する関数
    @returns {Array} - 条件に一致するユーザーデータの配列
*/
export function getFilteredUsers(users, conditions) {
    // 条件に一致するユーザーデータをフィルタリングして新しい配列を作成
    const results = users.filter(conditions);
    return results;
}