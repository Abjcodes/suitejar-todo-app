import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3PWYJgIokmWq0U5bopC3BYTPKQjEXApo",
    authDomain: "suitejar-todo-app.firebaseapp.com",
    projectId: "suitejar-todo-app",
    storageBucket: "suitejar-todo-app.appspot.com",
    messagingSenderId: "321552774401",
    appId: "1:321552774401:web:3589121f82977ccbdfd700"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
export { db };

