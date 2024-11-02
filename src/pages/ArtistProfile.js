import React, { useContext } from "react";
import "../App.css";
import ProfileView from "../components/ProfileView";

export default function ArtistProfile() {
  return (
    <div className="App">
      <header className="App-header">
        <ProfileView />
      </header>
    </div>
  );
}
