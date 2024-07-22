import React from "react";
import Dragbtn from "../components/Dragbtn";
import { useHistory } from "react-router-dom";
import "../App.css";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import BackGroundVideo from "../components/BackGroundVideo";
import DragIcon from "../components/DragIcon";

const Welcome = () => {
  const history = useHistory();

  function handleDoubleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title changing-colors">RANDOM RAINBOW</h1>
        <div className="icons-group">
          <Dragbtn
            name="manifesto"
            onDoubleClick={() => handleDoubleClick("manifesto")}
          />
          <Dragbtn
            name="home"
            onDoubleClick={() => handleDoubleClick("home/0")}
          />
        </div>
        <BackGroundVideo />
      </header>
    </div>
  );
};

export default Welcome;
