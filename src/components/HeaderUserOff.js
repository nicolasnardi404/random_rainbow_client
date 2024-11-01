import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  faBars,
  faUserAstronaut,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../images/logo.png";

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
      <img src={logo} alt="RANDOM RAINBOW" className="logo-title" />
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
          <h3>LOG IN</h3>
        </div>
        <div
          className="icons-style menu-btn"
          onClick={() => handleClick("sign-in")}
        >
          <FontAwesomeIcon icon={faUsers} />
          <h3>SIGN UP</h3>
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
        <div className="icons-group">
          <button
            className="default-btn"
            onClick={() => handleClick("manifesto")}
          >
            MANIFESTO
          </button>
          <button className="default-btn" onClick={() => handleClick("log-in")}>
            LOG IN
          </button>
          <button
            className="default-btn"
            onClick={() => handleClick("sign-in")}
          >
            SIGN IN
          </button>
          <button className="default-btn" onClick={() => handleClick("home/0")}>
            HOME
          </button>
        </div>
      </div>
    </div>
  );
}
