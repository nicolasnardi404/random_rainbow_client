import React, { useContext } from "react";
import "../App.css";
import UpdateVideoAdmin from "../components/UpdateVideoAdmin";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";

export default function VideoUpdateAdmin() {
  const { accessToken } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        {accessToken && accessToken !== "" ? (
          <HeaderUserOn />
        ) : (
          <HeaderUserOff />
        )}
        <UpdateVideoAdmin />
      </header>
    </div>
  );
}
