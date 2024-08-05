import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../App.css";
import { useLocation } from "react-router-dom";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";
import ProfileView from "../components/ProfileView";

export default function ArtistProfile() {
  const { authToken } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        {authToken && authToken !== "" ? <HeaderUserOn /> : <HeaderUserOff />}
        <ProfileView />
      </header>
    </div>
  );
}
