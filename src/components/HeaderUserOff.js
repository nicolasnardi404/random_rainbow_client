import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  faBars,
  faUserAstronaut,
  faUsers,
  faFlask,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../images/logo.png";

export default function HeaderUserOff() {
  const history = useHistory();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");

  function handleClick(path) {
    setSelectedMenu(path);
    if (path === "lab") {
      window.location.href = "https://lab.randomrainbow.art";
    } else {
      history.push(`/${path}`);
    }
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
        *MENU*
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <div className="menu-logo">
          <img src={logo} alt="RANDOM RAINBOW" className="logo-title" />
        </div>
        <div className="all-icons">
          <div
            className={`icons-style menu-btn log-in `}
            onClick={() => handleClick("log-in")}
          >
            <FontAwesomeIcon icon={faUserAstronaut} />
            <h3>LOGIN</h3>
          </div>
          <div
            className={`icons-style menu-btn sign-in`}
            onClick={() => handleClick("sign-in")}
          >
            <FontAwesomeIcon icon={faUsers} />
            <h3>SIGN UP</h3>
          </div>
        </div>
        <div className="icons-group-on">
          <div
            className={`default-btn menu-btn ${selectedMenu === "manifesto" ? "selected" : ""}`}
            onClick={() => handleClick("manifesto")}
          >
            Manifesto
          </div>
          <div
            className={`default-btn menu-btn ${selectedMenu === "support" ? "selected" : ""}`}
            onClick={() => handleClick("support")}
          >
            Support
          </div>
          <div
            className={`default-btn menu-btn ${selectedMenu === "how-it-works" ? "selected" : ""}`}
            onClick={() => handleClick("how-it-works")}
          >
            How It Works
          </div>
          <div
            className={`default-btn menu-btn ${selectedMenu === "home/0" ? "selected" : ""}`}
            onClick={() => handleClick("home/0")}
          >
            Rainbow
          </div>
          {/* <div
            className={`default-btn menu-btn ${selectedMenu === "lab" ? "selected" : ""}`}
            onClick={() => handleClick("lab")}
          >
            Lab
          </div> */}
          <div
            className={`default-btn ${selectedMenu === "return" ? "selected" : ""}`}
            onClick={toggleMenu}
          >
            Return
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className={`desktop-menu ${isMenuOpen ? "hidden" : ""}`}>
        <div className="icons-group-off">
          <div
            className={`default-btn menu-btn-desktop ${selectedMenu === "manifesto" ? "selected" : ""}`}
            onClick={() => handleClick("manifesto")}
          >
            MANIFESTO
          </div>
          <div
            className={`default-btn menu-btn-desktop  ${selectedMenu === "how-it-works" ? "selected" : ""}`}
            onClick={() => handleClick("how-it-works")}
          >
            HOW IT WORKS
          </div>
          <div
            className={`default-btn menu-btn-desktop ${selectedMenu === "log-in" ? "selected" : ""}`}
            onClick={() => handleClick("log-in")}
          >
            LOGIN
          </div>
          <div
            className={`default-btn menu-btn-desktop ${selectedMenu === "home/0" ? "selected" : ""}`}
            onClick={() => handleClick("home/0")}
          >
            RAINBOW
          </div>
          <div
            className={`default-btn menu-btn-desktop ${selectedMenu === "lab" ? "selected" : ""}`}
            onClick={() => handleClick("lab")}
          >
            LAB
          </div>
          <div
            className={`default-btn menu-btn-desktop ${selectedMenu === "support" ? "selected" : ""}`}
            onClick={() => handleClick("support")}
          >
            SUPPORT
          </div>
        </div>
      </div>
    </div>
  );
}
