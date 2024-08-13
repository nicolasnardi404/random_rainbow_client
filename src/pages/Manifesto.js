import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";
import React, { useContext } from "react";

export default function Manifesto() {
  const { accessToken } = useContext(AuthContext);
  return (
    <div className="App">
      <header className="App-header">
        {accessToken && accessToken !== "" ? (
          <HeaderUserOn />
        ) : (
          <HeaderUserOff />
        )}
        <h1>ABOUT ME</h1>
      </header>
    </div>
  );
}
