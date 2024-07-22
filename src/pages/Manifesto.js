import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";
import React, { useContext } from "react";

export default function Manifesto() {
  const { authToken } = useContext(AuthContext);
  return (
    <div className="App">
      <header className="App-header">
        {authToken && authToken !== "" ? <HeaderUserOn /> : <HeaderUserOff />}
        <h1>ABOUT ME</h1>
      </header>
    </div>
  );
}
