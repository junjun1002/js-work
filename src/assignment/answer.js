// 課題0: ユーザーデータを取得して表示する
import {getUsers} from "./No-0/work-0.js";
// ユーザーデータを取得
const users = getUsers();
console.log("ユーザーデータ:", users);

// 課題1: ユーザーデータのコインの合計を計算して表示する
import {calculateTotalCoins} from "./No-1/work-1.js";
console.log("コインの合計:", calculateTotalCoins(users));

// 課題2: 条件に合うユーザーをフィルタリングして表示する
import { getFilteredUsers } from "./No-2/work-2.js";
const filteredUsers = getFilteredUsers(users, user => user.coin >= 100);
console.log("フィルタリングされたユーザー:", filteredUsers);

// 課題3: データ変換(map)を使用して全ユーザーにコインを加算する
import { addCoinsToUsers } from "./No-3/work-3.js";
const updatedUsers = addCoinsToUsers(users, 100);
console.log("コイン加算前のユーザー:", users);
console.log("コイン加算後のユーザー:", updatedUsers);

// 課題4: データを検索して更新する(findを使用して特定のユーザーにコインを加算する)
import { rewardUser } from "./No-4/work-4.js";
let targetUserId = 2; // 例: ユーザーID 2 にコインを加算
let addAmount = 500; // 加算するコインの数
// ユーザー に 500 コインを加算する例
try {
    const updated = rewardUser(users, targetUserId, addAmount);
    console.log(`ユーザーID ${targetUserId} に ${addAmount} コインを加算した後のユーザーの一覧:`, updated);
} catch (error) {
    console.error(error.message);
}

// 課題5: 集計する（reduce / object）
import { aggregateByLevelRange } from "./No-5/work-5.js";
const levelRangeAggregation = aggregateByLevelRange(users);
console.log("レベル範囲ごとのユーザー数:", levelRangeAggregation);

// 課題6: 配列の中の配列を扱う（items集計）
import { aggregateItems } from "./No-6/work-6.js";
const itemAggregation = aggregateItems(users);
console.log("全ユーザーのアイテム集計 :", itemAggregation);

// 課題7: 非同期の入口（Promise / async-await）
import { sleep } from "./No-7/work-7.js";

async function main() {
  const ms = 500;
  console.log("start");
  console.log(`${ms}ms待つ`);
  await sleep(ms);
  console.log(`after ${ms}ms`);
  console.log(`さらに${ms}ms待つ`);
  await sleep(ms);
  console.log("done");
}

await main();

// ボーナス課題: ミニ運営っぽい問題
 import { updateDormantUsers } from "./Ex/bonus.js";
 const { updatedUsers: updatedDormantUsers, dormantUsersCount } = updateDormantUsers(users);
 console.log("休眠ユーザーの数:", dormantUsersCount);
 console.log("休眠ユーザーのコインをリセットしたユーザーデータ:", updatedDormantUsers);