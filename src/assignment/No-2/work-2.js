import users from "../No-0/work-0.js";

const results = users.filter(user =>{
    return user.coin >= 100
});

console.log("所持金が100コイン以上のユーザー:", results);