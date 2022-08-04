import React from "react";
import AddTodo from "./components/AddTodo";
import ViewTodo from "./components/ViewTodo";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase_config";

function App() {
  const [todos, setTodos] = React.useState([]);
  const[searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };
  const toggleFavourite = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { favourite: !todo.favourite });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="App">
      <div className = "MainContainer">
        <div className="leftContainer">
          <AddTodo />
        </div>
        <div className="rightContainer">
        <input type="text" placeholder="Search"
        onChange={(e) => {
        setSearchTerm(e.target.value);
     }} 
     ></input>   
        {todos.filter((todo) => {
          if(searchTerm === "" || 
          todo.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return todo
          }
        }).map((todo) => (
          <ViewTodo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            toggleFavourite={toggleFavourite}
            handleDelete={handleDelete}
          />
        ))}
        </div>
      </div>
    </div>
  );
}

export default App;
