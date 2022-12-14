import React from "react";
import { db } from "../firebase_config";
import { collection, addDoc } from "firebase/firestore";
import './componentStyles.css';


export default function AddTodo() {
  //States for title and descriotion
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  //function to adding keys and values to firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, "todos"), {
        title,
        description,
        completed: false,
        favourite: false,
        removed: false
      });
      setTitle("");
      setDescription("");
    }
  };
  //render
  return (
    <div className="AmainContainer">
    <form onSubmit={handleSubmit}>
      <div className="input_container">
        <div className="textContainer">
          <h2>TODO</h2>
          <p className="addText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aliquet at eleifend feugiat vitae faucibus nibh dolor dui.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Aliquet at eleifend feugiat vitae faucibus nibh dolor dui. 
          </p>
        </div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <br/>
      <div className="btn_container">
        <button>Add</button>
      </div>
    </form>
    </div>
  );
}