import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import logo from "../images/logo.png";

export default function HeaderUserOn() {
  const { username, setAccessTokenLocal } = useContext(AuthContext);
  const history = useHistory();
  const [isMenuOpen, setMenuOpen] = useState(false);

  function handleClick(path) {
    history.push(`/${path}`);
    setMenuOpen(false); // Close menu on item click
  }

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  return (
    <div>
      <img src={logo} alt="RANDOM RAINBOW" className="logo-title" />
      {/* Mobile Menu Toggle Button */}
      <button className="menu-button" onClick={toggleMenu}>
        MENU
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <div className="icons-group">
          <button className="default-btn" onClick={() => handleClick("videos")}>
            {username}
          </button>
          <button
            className="default-btn"
            onClick={() => handleClick("manifesto")}
          >
            Manifesto
          </button>
          <button className="default-btn" onClick={() => handleClick("home/0")}>
            Home
          </button>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className={`desktop-menu ${isMenuOpen ? "hidden" : ""}`}>
        <div className="icons-group">
          <button className="default-btn" onClick={() => handleClick("videos")}>
            {username}
          </button>
          <button
            className="default-btn"
            onClick={() => handleClick("manifesto")}
          >
            Manifesto
          </button>
          <button className="default-btn" onClick={() => handleClick("home/0")}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
