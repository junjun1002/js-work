const users = [
  { id: 1, name: "Taro", coin: 100, level: 5, lastLoginDaysAgo: 1, items: ["potion"] },
  { id: 2, name: "Hanako", coin: 300, level: 12, lastLoginDaysAgo: 10, items: ["sword", "potion"] },
  { id: 3, name: "Saburo", coin: 50, level: 2, lastLoginDaysAgo: 0, items: [] },
  { id: 4, name: "Yuki", coin: 1200, level: 20, lastLoginDaysAgo: 40, items: ["shield"] },
];

/** 
 * ユーザーデータを取得する関数
 * @returns {Array} ユーザーデータの配列
 */
export function getUsers(){
  return users;
}