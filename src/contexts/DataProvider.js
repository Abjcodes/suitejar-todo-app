import React, {useState, useEffect, createContext, useContext} from 'react';
import {
  collection,
  query,
  onSnapshot,
  doc
} from "firebase/firestore";
import { db } from "../firebase_config";

export const DataContext = createContext();

export function useData() {
  return useContext(DataContext)
}

export const DataProvider = ({children}) => {
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
        <DataContext.Provider value={[todos,setTodos]}>
            {children}
        </DataContext.Provider>
    )
}