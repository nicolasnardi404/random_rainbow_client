// AuthContext.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const ProvideAuth = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );
  const [role, setRoleState] = useState(localStorage.getItem("role") || "");

  const [idUser, setIdUser] = useState(localStorage.getItem("idUser") || "");

  const [username, setUser] = useState(localStorage.getItem("sub") || "");

  const setToken = (token) => {
    setAuthToken(token);
    localStorage.setItem("authToken", token);
  };

  const setUsername = (sub) => {
    setUser(sub);
    localStorage.setItem("username", username);
  };

  const setRole = (newRole) => {
    setRoleState(newRole);
    localStorage.setItem("role", newRole);
  };

  const setId = (idUser) => {
    setIdUser(idUser);
    localStorage.setItem("idUser", idUser);
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        role,
        idUser,
        username,
        setToken,
        setRole,
        setId,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
