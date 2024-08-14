import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../App.css";
import { useLocation } from "react-router-dom";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";
import ProfileEdit from "../components/ProfileEdit";

export default function ProfileUser() {
  const { accessToken } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        {accessToken && accessToken !== "" ? (
          <HeaderUserOn />
        ) : (
          <HeaderUserOff />
        )}
        <ProfileEdit />
      </header>
    </div>
  );
}
