import React, { useState, useEffect, createContext, useContext } from "react";
import { auth, db } from "./firebase";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [curUser, setCurUser] = useState(null);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        console.log("no user");
        setCurUser(null);
      } else {
        console.log(user);
        const token = await user.getIdToken();
        const userData = {
          displayName: user.displayName,
          email: user.email,
          lastSeen: serverTimestamp(),
        };
        await setDoc(doc(db, "users", user.uid), userData);
        console.log("user token", token);
        setCurUser(user);
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ curUser }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
