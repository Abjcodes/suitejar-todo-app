import React from "react";
import './componentStyles.css';


export default function ViewTodo({ todo, toggleComplete, handleDelete,toggleFavourite, handleRemove }) {
  
  //Functions for handling three buttons and their states
  function viewDltButton() {
    if(todo.removed === false){
      return (
      <button className="button-remove" onClick={() => handleRemove(todo)}>
      Remove
      </button>
      )
    } else {
      return (
      <button className="button-remove" onClick={() => handleDelete(todo.id)}>
        Permanently delete
      </button>
      )
    }
  }

  function viewFavButton() {
    if(todo.favourite === false){
      return (
        <button
        className="button-favourite"
        onClick={() => toggleFavourite(todo)}>
          Favourite
        </button>
      )
    } else {
      return (
        <button
        className="button-favourite"
        onClick={() => toggleFavourite(todo)}>
          Remove from Favourites
        </button>
      )
    }
  }

  function viewCmpltBtn() {
    if(todo.completed === false) {
      return (
        <button
          className="button-complete"
          onClick={() => toggleComplete(todo)}>
           Mark as Completed
        </button>
      )
    } else {
      return (
        <button
          className="button-complete"
          onClick={() => toggleComplete(todo)}>
            Mark as incomplete
        </button>
      )
    }
  }

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
        {viewCmpltBtn()}
        {viewDltButton()}
        {viewFavButton()}
      </div>
      <hr></hr>
    </div>
  );
}