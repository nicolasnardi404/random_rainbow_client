import React, { useState, useContext } from "react";
import {
  faBars,
  faPersonThroughWindow,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function HeaderUserOn() {
  const { username, setAccessTokenLocal } = useContext(AuthContext);
  const history = useHistory();
  const [isMenuOpen, setMenuOpen] = useState(false);

  function handleClick(path) {
    history.push(`/${path}`);
    setMenuOpen(false); // Close menu on item click
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

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  return (
    <div>
      <h1 className="app-title hidden-title">RANDOM RAINBOW</h1>
      {/* Mobile Menu Toggle Button */}
      <button className="menu-button" onClick={toggleMenu}>
        <FontAwesomeIcon className="icon-menu" icon={faBars} />
        MENU
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <div
          className="icons-style menu-btn"
          onClick={() => handleClick("videos")}
        >
          <FontAwesomeIcon icon={faSmile} />
          <h3>{username}</h3>
        </div>
        <div className="icons-group">
          <button
            className="default-btn menu-btn"
            onClick={() => handleClick("manifesto")}
          >
            Manifesto
          </button>
          <button
            className="default-btn menu-btn"
            onClick={() => handleClick("home/0")}
          >
            Home
          </button>
          <button
            className="default-btn menu-btn"
            onClick={() => handleClick("profile")}
          >
            Edit Profile
          </button>
          <button className="default-btn" onClick={toggleMenu}>
            return
          </button>
        </div>
        <div className="icons-style menu-btn" onClick={handleLogout}>
          <FontAwesomeIcon icon={faPersonThroughWindow} />
          <h3>Log Out</h3>
        </div>
      </div>

      {/* Desktop View */}
      <div className={`desktop-menu ${isMenuOpen ? "hidden" : ""}`}>
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
          <button
            className="default-btn"
            onClick={() => handleClick("profile")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
