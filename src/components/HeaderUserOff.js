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
  const [selectedMenu, setSelectedMenu] = useState("");

  function handleClick(path) {
    setSelectedMenu(path);
    history.push(`/${path}`);
    setMenuOpen(false);
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
          className={`icons-style menu-btn ${selectedMenu === "log-in" ? "selected" : ""}`}
          onClick={() => handleClick("log-in")}
        >
          <FontAwesomeIcon icon={faUserAstronaut} />
          <h3>LOG IN</h3>
        </div>
        <div
          className={`icons-style menu-btn ${selectedMenu === "sign-in" ? "selected" : ""}`}
          onClick={() => handleClick("sign-in")}
        >
          <FontAwesomeIcon icon={faUsers} />
          <h3>SIGN UP</h3>
        </div>
        <div
          className={`default-btn menu-btn ${selectedMenu === "manifesto" ? "selected" : ""}`}
          onClick={() => handleClick("manifesto")}
        >
          Manifesto
        </div>
        <div
          className={`default-btn menu-btn ${selectedMenu === "how-it-works" ? "selected" : ""}`}
          onClick={() => handleClick("how-it-works")}
        >
          How It Works
        </div>
        <div
          className={`default-btn ${selectedMenu === "home/0" ? "selected" : ""}`}
          onClick={() => handleClick("home/0")}
        >
          Rainbow
        </div>
        <div
          className={`default-btn ${selectedMenu === "return" ? "selected" : ""}`}
          onClick={toggleMenu}
        >
          Return
        </div>
      </div>

      {/* Desktop View */}
      <div className={`desktop-menu ${isMenuOpen ? "hidden" : ""}`}>
        <div className="icons-group-off">
          <div
            className={`default-btn ${selectedMenu === "manifesto" ? "selected" : ""}`}
            onClick={() => handleClick("manifesto")}
          >
            MANIFESTO
          </div>
          <div
            className={`default-btn menu-btn ${selectedMenu === "how-it-works" ? "selected" : ""}`}
            onClick={() => handleClick("how-it-works")}
          >
            HOW IT WORKS
          </div>
          <div
            className={`default-btn ${selectedMenu === "log-in" ? "selected" : ""}`}
            onClick={() => handleClick("log-in")}
          >
            LOG IN
          </div>
          <div
            className={`default-btn ${selectedMenu === "home/0" ? "selected" : ""}`}
            onClick={() => handleClick("home/0")}
          >
            RAINBOW
          </div>
        </div>
      </div>
    </div>
  );
}
