const seedUsers = [
  { id: 1, name: "Taro", coin: 100 },
  { id: 2, name: "Hanako", coin: 250 },
  { id: 3, name: "Saburo", coin: 80 },
];

export async function fetchUsers() {
  return Promise.resolve(seedUsers);
}
