import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  faBars,
  faUserAstronaut,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HeaderUserOff() {
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
          onClick={() => handleClick("log-in")}
        >
          <FontAwesomeIcon icon={faUserAstronaut} />
          <h3>Log In</h3>
        </div>
        <div
          className="icons-style menu-btn"
          onClick={() => handleClick("sign-in")}
        >
          <FontAwesomeIcon icon={faUsers} />
          <h3>Sign In</h3>
        </div>
        <button
          className="default-btn menu-btn"
          onClick={() => handleClick("manifesto")}
        >
          Manifesto
        </button>
        <button className="default-btn" onClick={() => handleClick("home/0")}>
          Home
        </button>
        <button className="default-btn" onClick={toggleMenu}>
          Return
        </button>
      </div>

      {/* Desktop View */}
      <div className={`desktop-menu ${isMenuOpen ? "hidden" : ""}`}>
        <a href="/welcome" className="app-title">
          RANDOM RAINBOW
        </a>
        <div className="icons-group">
          <button
            className="default-btn"
            onClick={() => handleClick("manifesto")}
          >
            Manifesto
          </button>
          <div className="icons-style" onClick={() => handleClick("log-in")}>
            <FontAwesomeIcon icon={faUserAstronaut} />
            <h4>Log In</h4>
          </div>
          <div className="icons-style" onClick={() => handleClick("sign-in")}>
            <FontAwesomeIcon icon={faUsers} />
            <h4>Sign In</h4>
          </div>
          <button className="default-btn" onClick={() => handleClick("home/0")}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
