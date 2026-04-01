import React, { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:3001/todos");
    const data = await response.json();
    setTodos(data);
  };

  const handleAddTodo = async () => {
    if (!inputValue.trim()) {
      return;
    }

    const response = await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: inputValue
      })
    });

    const newTodo = await response.json();

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  return (
    <main style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h1>ToDoアプリ</h1>

      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="やることを入力"
        />
        <button onClick={handleAddTodo} style={{ marginLeft: "8px" }}>
        追加
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "8px" }}>
            <span>
              {todo.completed ? "完了" : "未完了"} / {todo.title}
            </span>
            <button style={{ marginLeft: "8px" }}>切り替え</button>
            <button style={{ marginLeft: "8px" }}>削除</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
