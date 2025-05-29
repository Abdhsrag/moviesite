import { useState, useEffect } from "react";
import { TodoForm, TodoList } from "../common/todoComp";
import "./todo.css";

function Todo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    document.title = "To Watch List";
  }, []);

  const addTodo = (text) => {
    setTodos([...todos, { text, done: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo, i) =>
        i === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((_, i) => i !== id));
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div
        className="card shadow-lg todo-glass-card"
        style={{
          minWidth: "500px",
          maxWidth: "700px",
          width: "100%",
        }}
      >
        <div className="card-body">
          <h2 className="card-title text-center mb-4 fw-bold todo-title">
            <i className="bi bi-list-check me-2"></i>
            To Watch List
          </h2>
          <div className="todo-form">
            <TodoForm onAdd={addTodo} />
          </div>
          <div className="todo-list mt-3">
            <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;