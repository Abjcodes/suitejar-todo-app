import React from "react";
import Home from "./pages/Home";
import {Route,Routes} from 'react-router-dom'; 
import Signin from "./pages/Signin";
import { AuthContextProvider } from './contexts/AuthContext';
import Protected from "./components/Protected";

function App() {
return (
  <AuthContextProvider>
  <Routes>
    <Route path='/' element={<Signin />} />
    <Route path='/home' element={
    <Protected>
    <Home />
  </Protected>
    } />
  </Routes>
  </AuthContextProvider>
)
}

export default App;