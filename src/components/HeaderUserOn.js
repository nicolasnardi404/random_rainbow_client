import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import "../styles/Header.css";

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
      <div className="user-avatar">
        <div onClick={() => handleClick("my-piece-of-random-rainbow")}>
          <FontAwesomeIcon icon={faSmile} />
          <h3>{username}</h3>
        </div>
      </div>
      <img src={logo} alt="RANDOM RAINBOW" className="logo-title" />
      {/* Mobile Menu Toggle Button */}
      <button className="menu-button" onClick={toggleMenu}>
        *MENU*
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "show" : "hide"}`}>
        <div className="icons-group-on">
          <button
            className="default-btn"
            onClick={() => handleClick("my-piece-of-random-rainbow")}
          >
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
          {/* Close Menu Button */}
          <button className="default-btn" onClick={toggleMenu}>
            Return
          </button>
        </div>
      </div>

      {/* Desktop Menu */}
      <div
        className={`desktop-menu ${isMenuOpen ? "hidden" : ""} header-user-on`}
      >
        <div className="icons-group-on">
          <button
            className="default-btn"
            onClick={() => handleClick("manifesto")}
          >
            MANIFESTO
          </button>
          <button className="default-btn" onClick={() => handleClick("home/0")}>
            RAINBOW
          </button>
        </div>
      </div>
    </div>
  );
}
