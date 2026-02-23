import React, { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import TodoStats from "./TodoStats";
import Confetti from "react-confetti";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState("light");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // Load Todos
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("taskflow"));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  // Save Todos
  useEffect(() => {
    localStorage.setItem("taskflow", JSON.stringify(todos));
  }, [todos]);

  // Load Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Apply Theme
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const addTodo = (text, dueDate, priority) => {
  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
    dueDate,
    priority,
  };
  setTodos([...todos, newTodo]);
};

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  {showConfetti && <Confetti />}
  const toggleComplete = (id) => {
  setTodos(
    todos.map((todo) => {
      if (todo.id === id && !todo.completed) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
      return todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo;
    })
  );
};
  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const filteredTodos = todos
  .filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  })
  .filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
  <div className="app-container">
    <div className="header">
      <h1>TaskFlow</h1>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark" : "☀ Light"}
      </button>
    </div>

    <div className="controls">

  <input
    type="text"
    placeholder="Search tasks..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-input"
  />

  <div className="filter-buttons">
  <button
  className={filter === "all" ? "active-filter" : ""}
  onClick={() => setFilter("all")}
>
  All
</button>

  <button onClick={() => setFilter("active")}>
    Active
  </button>

  <button onClick={() => setFilter("completed")}>
    Completed
  </button>
</div>

</div>

  

    <AddTodoForm addTodo={addTodo} />
    <TodoList
  todos={filteredTodos}
  deleteTodo={deleteTodo}
  toggleComplete={toggleComplete}
  editTodo={editTodo}
/>
  </div>
);
};

export default TodoApp;