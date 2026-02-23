import React, { useState } from "react";

const TodoItem = ({ todo, deleteTodo, toggleComplete, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    editTodo(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <>
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span
           className={todo.completed ? "completed" : ""}
           onClick={() => toggleComplete(todo.id)}
          >
          {todo.text}
          </span>
          <div className="action-buttons">
  <button className="edit-btn" onClick={() => setIsEditing(true)}>
    Edit
  </button>
  <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
    Delete
  </button>
</div>

<p className="due-date">Due: {todo.dueDate}</p>
<span className={`priority ${todo.priority}`}>
  {todo.priority}
</span>
        </>
      )}
    </div>
  );
};

export default TodoItem;