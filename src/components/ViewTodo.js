import React from "react";
import './componentStyles.css';


export default function ViewTodo({ todo, toggleComplete, handleDelete,toggleFavourite }) {
  
  return (
    <div className="todo-container">
        <h1
        style={{ textDecoration: todo.completed && "line-through" }}
        className="list">
            {todo.title}
        </h1>
        <p
        style={{ textDecoration: todo.completed && "line-through" }}
        className="list">
            {todo.description}
        </p>
      <div class = "viewTodo-btn-container">
        <button
          className="button-complete"
          onClick={() => toggleComplete(todo)}>
            Complete
        </button>
        <button className="button-remove" onClick={() => handleDelete(todo.id)}>
            Remove
        </button>
        <button
          className="button-favourite"
          onClick={() => toggleFavourite(todo)}>
            {console.log(todo.id, todo.favourite)}
            Favourite
        </button>
      </div>
      <hr></hr>
    </div>
  );
}