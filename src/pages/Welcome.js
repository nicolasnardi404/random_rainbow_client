import React from "react";
import { useHistory } from "react-router-dom";
import BackGroundVideo from "../components/BackGroundVideo";

const Welcome = () => {
  const history = useHistory();

  function handleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title changing-colors">RANDOM RAINBOW</h1>
        <div className="icons-group">
          <button
            className="default-btn"
            onClick={() => handleClick("manifesto")}
          >
            MANIFESTO
          </button>
          <button className="default-btn" onClick={() => handleClick("home/0")}>
            HOME
          </button>
        </div>
        <BackGroundVideo />
      </header>
    </div>
  );
};

export default Welcome;
