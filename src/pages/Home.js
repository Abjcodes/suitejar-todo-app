import React, {  useState,useEffect } from "react";
import AddTodo from "../components/AddTodo";
import ViewTodo from "../components/ViewTodo";
import { UserAuth } from "../contexts/AuthContext";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase_config";
import './pagesStyles.css';

const Home = () => {
  //loggin user out on button click
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  //states for todos and removed todos and setting search terms
  const[todos, setTodos] = useState([]);
  const[removedTodos, setRemovedTodos] = useState([]);
  const[searchTerm, setSearchTerm] = useState("");

  //Function for getting the current items on the firestore database and setting it to current state
  const getItems = async () => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      let removedTodosArray = [];
      querySnapshot.forEach((doc) => {
        if(doc.data().removed === false){
        todosArray.push({ ...doc.data(), id: doc.id });
        }
        else {
          removedTodosArray.push({ ...doc.data(), id: doc.id });
        }
      });
      setTodos(todosArray);
      setRemovedTodos(removedTodosArray);
      console.log(todosArray);
    });
    return () => unsub();
  }

  //Triggers on change to retrieve data from the database
  useEffect(() => {
    getItems();
  }, []);

  //To set completed value of item
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };
  //To set favourite value of item
  const toggleFavourite = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { favourite: !todo.favourite });
  };//To set removed value of item
  const handleRemove = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { removed: !todo.removed });
  }
  //To delete item
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  // To handle filter menu
  const handleSelect = event => {
    console.log(event.target.value);
    if(event.target.value === "Complete"){
      setTodos(todos.filter((todo) => {
        if(todo.completed === true){
          return todo;
        }
      }));
    } else if(event.target.value === "Favourite"){
      setTodos(todos.filter((todo) => {
        if(todo.favourite === true){
          return todo;
        }
      }));
    }
    else if(event.target.value === "Removed"){
      setTodos(removedTodos);
    } else {
      getItems();
    }
  };

  return (
    <div className="App">
      <div className="loginDetails">
        <p>Welcome, {user?.displayName}</p>
      <button onClick={handleSignOut} className='logout-btn'>
        Logout
      </button>
      </div>
      <div className = "MainContainer">
        <div className="leftContainer">
          <AddTodo />
        </div>
        <hr></hr>
        <div className="rightContainer">
          <h2>
            TODO LIST
          </h2>
          <div className="sfContainer">
        <input className= "searchBar" type="text" placeholder="Search"
        onChange={(e) => {
        setSearchTerm(e.target.value);
     }} 
     ></input>
     <select className= "filter" onChange={handleSelect}>
      <option defaultValue="All">All</option>
      <option value="Complete">Completed</option>
      <option value="Favourite">Favourites</option>
      <option value="Removed">Removed</option>
    </select>   
    </div>
    <div className="listContainer">
        {//To filter out search item
        todos.filter((todo) => {
          if(searchTerm === "" || 
          todo.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return todo;
          }
        }).map((todo) => (
          //Mapping out each key value pairs by passing through the ViewTodo component to view the list
          <ViewTodo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            toggleFavourite={toggleFavourite}
            handleDelete={handleDelete}
            handleRemove={handleRemove}
          />
        ))}
        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;