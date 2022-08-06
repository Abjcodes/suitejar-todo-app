import React, {  useState,useEffect } from "react";
import AddTodo from "../components/AddTodo";
import ViewTodo from "../components/ViewTodo";
//import NavBar from "../components/NavBar";
import { UserAuth } from "../contexts/AuthContext";
// import {DataProvider, useData} from "./contexts/DataProvider";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase_config";

const Home = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const[todos, setTodos] = useState([]);
  const[searchTerm, setSearchTerm] = useState("");

  // const [d1,d2] = useData;

  const getItems = async () => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }

  useEffect(() => {
    getItems();
  }, []);

  //To set completed value of item
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };
  const toggleFavourite = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { favourite: !todo.favourite });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

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
    } else {
      getItems();
    }
  };

  return (
    <div className="App">
      <div className="loginDetails">
        <p>Welcome, {user?.displayName}</p>
      <button onClick={handleSignOut} className='border py-2 px-5 mt-10'>
        Logout
      </button>
      </div>
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
     <select onChange={handleSelect}>
      <option defaultValue="All">All</option>
      <option value="Complete">Completed</option>
      <option value="Favourite">Favourites</option>
    </select>   
        {todos.filter((todo) => {
          if(searchTerm === "" || 
          todo.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return todo;
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

export default Home;