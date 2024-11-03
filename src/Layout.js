import React, { useContext } from "react";
import { AuthContext } from "./components/AuthContext";
import HeaderUserOn from "./components/HeaderUserOn";
import HeaderUserOff from "./components/HeaderUserOff";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const { accessToken } = useContext(AuthContext);
  const location = useLocation();

  const isManifesto = location.pathname === "/manifesto";
  const containerClass = `App ${isManifesto ? "manifesto-app" : ""}`;

  return (
    <div className={containerClass}>
      {accessToken && accessToken !== "" ? <HeaderUserOn /> : <HeaderUserOff />}
      {children}
    </div>
  );
};

export default Layout;
