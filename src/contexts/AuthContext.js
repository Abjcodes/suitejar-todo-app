import { useContext, createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  //signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase_config';

//Creating context
const AuthContext = createContext();

//Initiating signin (popup or redirect based upon preference)
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    //Uncomment and comment to select popup or redirect based signins(default:popup)
    signInWithPopup(auth, provider);
    //signInWithRedirect(auth, provider)
  };

  //Logging the user out
  const logOut = () => {
      signOut(auth)
  }

  //setting the current user as the logged in user 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('User', currentUser)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};