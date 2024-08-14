import React from "react";
import { useHistory } from "react-router-dom";
import { faUserAstronaut, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HeaderUserOff() {
  const history = useHistory();

  function handleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div>
      <a href="/welcome" className="app-title">
        RANDOM RAINBOW
      </a>
      <div className="icons-group">
        <button
          className="default-btn" // Maintain class name for styling
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
        <button
          className="default-btn" // Maintain class name for styling
          onClick={() => handleClick("home/0")}
        >
          Home
        </button>
      </div>
    </div>
  );
}
