import { AuthReducer } from "../reducer/reducer.js";

import React, { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const initialState = {
  user: {
    isLoggedIn: false,
  },
};

export const AuthContextProvider = (props) => {
  const [user, dispatch] = useReducer(AuthReducer, {}, () => {
    const localData =
      global.localStorage && global.localStorage.getItem("user");
    return localData ? JSON.parse(localData) : initialState;
  });
  useEffect(() => {
    global.localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};


