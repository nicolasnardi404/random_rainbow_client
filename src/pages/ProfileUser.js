import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../App.css";
import { useLocation } from "react-router-dom";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";
import ProfileEdit from "../components/ProfileEdit";

export default function ProfileUser() {
  const { authToken } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        {authToken && authToken !== "" ? <HeaderUserOn /> : <HeaderUserOff />}
        <ProfileEdit />
      </header>
    </div>
  );
}
