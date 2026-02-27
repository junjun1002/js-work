/**
 * 指定された時間（ミリ秒）待機するPromiseを返す関数
 * @param {number} ms - 待機時間をミリ秒で指定
 * @returns {Promise<void>} 指定された時間が経過した後に解決するPromise
 * @throws {Error} msが0未満の場合にエラーをスロー
 */
export function sleep(ms) {
    // msが0未満の場合はエラーをスロー
    if (ms < 0) {
        return Promise.reject(new Error("待機時間は0以上の数値でなければなりません"));
    }
    // 指定された時間が経過した後に解決するPromiseを返す
    return new Promise((resolve) => setTimeout(resolve, ms));
}
