import users from "../No-0/work-0.js";

const results = users.map((user) => {
  return {
    ...user,
    coin: user.coin + 100
  };
});

console.log("元のusers:", users);
console.log("100コイン加算後:", results);
