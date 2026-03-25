function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <h1>React CDN Practice</h1>
      <p>count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        +1
      </button>

      <button onClick={() => setCount(0)} style={{ marginLeft: 8 }}>
        reset
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);