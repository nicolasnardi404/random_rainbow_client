import React from "react";
import Dragbtn from "../components/Dragbtn";
import { useHistory, useParams } from "react-router-dom";
import "../App.css";
import { faPersonThroughWindow } from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import DragIcon from "../components/DragIcon";
import AddNewVideo from "../components/AddNewVideo";
import { useLocation } from "react-router-dom";

export default function NewVideo() {
  const history = useHistory();
  const location = useLocation();
  console.log(location.pathname);
  const { idUser, videoId } = useParams();
  console.log(idUser, videoId);

  function handleDoubleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="user-menu">
          <div className="icons-style">
            <DragIcon
              text="USERNAME"
              icon={faSmile}
              onDoubleClick={() => handleDoubleClick("videos")}
            />
          </div>
          <div className="icons-style">
            <DragIcon
              text="log-out"
              icon={faPersonThroughWindow}
              onDoubleClick={() => handleDoubleClick("sign-in")}
            />
          </div>
        </div>
        <h1 className="app-title">RANDOM RAINBOW</h1>
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
        <AddNewVideo />
      </header>
    </div>
  );
}
