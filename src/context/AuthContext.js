import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { setDoc, doc } from "firebase/firestore";
const AuthContext = createContext();

// our context
export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  // signUp
  // whenver this function is run, it will create a new user in the database
  // creates a user and email file
  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    //
    setDoc(doc(db, "users", email), {
      savedShows: [],
    });
  }
  //   signIn
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  //   signOut
  function logOut() {
    return signOut(auth);
  }
  // state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
