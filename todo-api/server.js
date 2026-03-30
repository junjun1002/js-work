const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, title: "買い物に行く", completed: false },
  { id: 2, title: "課題を進める", completed: true }
];

app.get("/", (req, res) => {
  res.send("ToDo API is running");
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});