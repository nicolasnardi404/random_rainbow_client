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

  const setUsername = (sub) => {
    setUser(sub);
    localStorage.setItem("username", sub);
  };

  const setRole = (newRole) => {
    setRoleState(newRole);
    localStorage.setItem("role", newRole);
  };

  const setId = (idUser) => {
    setIdUser(idUser);
    localStorage.setItem("idUser", idUser);
  };

  const setAccessTokenLocal = (token) => {
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
  };

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
