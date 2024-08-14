import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const ProvideAuth = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("accessToken") || ""
  );
  const [role, setRoleState] = useState(
    () => localStorage.getItem("role") || ""
  );
  const [idUser, setIdUser] = useState(
    () => localStorage.getItem("idUser") || ""
  );
  const [username, setUser] = useState(
    () => localStorage.getItem("username") || ""
  );
  const [refreshToken, setRefreshToken] = useState(
    () => localStorage.getItem("refreshToken") || ""
  );

  // Function to set the username
  const setUsername = (sub) => {
    setUser(sub);
    localStorage.setItem("username", sub);
  };

  // Function to set the role
  const setRole = (newRole) => {
    setRoleState(newRole);
    localStorage.setItem("role", newRole);
  };

  // Function to set the idUser
  const setId = (idUser) => {
    setIdUser(idUser);
    localStorage.setItem("idUser", idUser);
  };

  // Function to set the accessToken
  const setAccessTokenLocal = (token) => {
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
  };

  // Function to set the refreshToken
  const setRefreshTokenLocal = (token) => {
    setRefreshToken(token);
    localStorage.setItem("refreshToken", token);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        role,
        idUser,
        username,
        setAccessTokenLocal,
        setRole,
        setId,
        setUsername,
        refreshToken,
        setRefreshTokenLocal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
