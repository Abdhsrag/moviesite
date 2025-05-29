import { useState } from "react";

function TodoForm({ onAdd }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onAdd(task);
      setTask("");
    }
  };

  return (
    <form className="d-flex mb-3" onSubmit={handleSubmit}>
      <input
        type="text"
        required
        className="form-control me-2"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a Movie Name"
      />
      <button type="submit" className="btn btn-primary d-flex align-items-center">
        <i className="bi bi-plus-circle me-1"></i>
        Add
      </button>
    </form>
  );
}

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span
        style={{
          textDecoration: todo.done ? "line-through" : "none",
          color: todo.done ? "#6c757d" : "#1e3c72",
          fontWeight: 500,
        }}
      >
        {todo.text}
      </span>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          className={`btn btn-sm d-flex align-items-center ${todo.done ? "btn-secondary" : "btn-success"}`}
          onClick={onToggle}
        >
          <i className={`bi ${todo.done ? "bi-arrow-counterclockwise" : "bi-check-circle"} me-1`}></i>
          {todo.done ? "Undo" : "Done"}
        </button>
        <button className="btn btn-sm btn-danger d-flex align-items-center" onClick={onDelete}>
          <i className="bi bi-trash me-1"></i>
          Delete
        </button>
      </div>
    </li>
  );
}

function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className="list-group">
      {todos.map((todo, id) => (
        <TodoItem
          key={id}
          todo={todo}
          onToggle={() => onToggle(id)}
          onDelete={() => onDelete(id)}
        />
      ))}
    </ul>
  );
}

export { TodoForm, TodoList };