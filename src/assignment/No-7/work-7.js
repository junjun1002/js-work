/**
 * 指定された時間（ミリ秒）待機するPromiseを返す関数
 * @param {number} ms 待機時間（ミリ秒）
 * @returns {Promise<number>} 待機時間（ミリ秒）を返すPromise
 */
export async function waitForPromise(ms) {
    // 指定された時間後に解決するPromiseを作成
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // 待機時間が正の数であることを確認
    if (ms < 0) {
        return Promise.reject(new Error("待機時間は0以上の数値でなければなりません"));
    }
    // 待機時間が0の場合はすぐに解決するPromiseを返す
    if (ms === 0) {
        return Promise.resolve(0);
    }
    // 待機時間が正の数の場合は指定された時間後に解決するPromiseを返す
    return sleep(ms).then(() => ms);
}