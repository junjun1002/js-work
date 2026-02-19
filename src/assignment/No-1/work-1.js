import users from "../No-0/work-0.js";

let totalCoins = 0;

users.forEach(user => {
    totalCoins += user.coin;
});

console.log("Total coins:", totalCoins);