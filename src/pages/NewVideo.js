import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../App.css";
import AddNewVideo from "../components/AddNewVideo";
import { useLocation } from "react-router-dom";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";

export default function NewVideo() {
  const { accessToken } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        {accessToken && accessToken !== "" ? (
          <HeaderUserOn />
        ) : (
          <HeaderUserOff />
        )}
        <AddNewVideo />
      </header>
    </div>
  );
}
