import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

// our context
export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  // signUp
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
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
