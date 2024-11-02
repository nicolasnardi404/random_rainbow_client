import React, { useContext } from "react";
import { AuthContext } from "./components/AuthContext";
import HeaderUserOn from "./components/HeaderUserOn";
import HeaderUserOff from "./components/HeaderUserOff";

const Layout = ({ children }) => {
  const { accessToken } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        {accessToken && accessToken !== "" ? (
          <HeaderUserOn />
        ) : (
          <HeaderUserOff />
        )}
        {children}
      </header>
    </div>
  );
};

export default Layout;
