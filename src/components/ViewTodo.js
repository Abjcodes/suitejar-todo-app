import React from "react";


export default function ViewTodo({ todo, toggleComplete, handleDelete,toggleFavourite }) {

  return (
    <div className="todo">
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
      <div>
        <button
          className="button-complete"
          onClick={() => toggleComplete(todo)}>
            Complete
        </button>
        <button className="button-delete" onClick={() => handleDelete(todo.id)}>
            Delete
        </button>
        <button
          className="button-favourite"
          onClick={() => toggleFavourite(todo)}>
            {console.log(todo.id, todo.favourite)}
            Favourite
        </button>
      </div>
    </div>
  );
}