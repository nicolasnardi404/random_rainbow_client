import React, { useContext } from "react";
import "../App.css";
import { AuthContext } from "../components/AuthContext";
import ProfileEdit from "../components/ProfileEdit";

export default function ProfileUser() {
  const { accessToken } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        <ProfileEdit />
      </header>
    </div>
  );
}
