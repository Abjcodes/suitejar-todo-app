import React, {useState, useEffect, createContext} from 'react';
import {
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase_config";

export const DataContext = createContext();

export const DataProvider = (props) => {
    const [todos, setTodos] = useState([]);
    
    useEffect(() => {
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
    
    return (
        <DataContext.Provider value={[todos, setTodos]}>
            {props.children}
        </DataContext.Provider>
    )
}