import React, { useContext } from "react";
import {
  faPersonThroughWindow,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function HeaderUserOn() {
  const { username, setAccessTokenLocal } = useContext(AuthContext);

  const history = useHistory();

  function handleClick(path) {
    history.push(`/${path}`);
  }

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setAccessTokenLocal("");
    console.log(localStorage);
    history.push("/welcome");
  }

  return (
    <div>
      <div className="user-menu">
        <div className="icons-style" onClick={() => handleClick("videos")}>
          <FontAwesomeIcon icon={faSmile} />
          <h4>{username}</h4>
        </div>
        <div className="icons-style" onClick={handleLogout}>
          <FontAwesomeIcon icon={faPersonThroughWindow} />
          <h4>Log Out</h4>
        </div>
      </div>
      <h1 className="app-title">RANDOM RAINBOW</h1>
      <div className="icons-group">
        <button
          className="default-btn"
          onClick={() => handleClick("manifesto")}
        >
          Manifesto
        </button>
        <button className="default-btn" onClick={() => handleClick("home/0")}>
          Home
        </button>
        <button className="default-btn" onClick={() => handleClick("profile")}>
          Edit Profile
        </button>
      </div>
    </div>
  );
}
