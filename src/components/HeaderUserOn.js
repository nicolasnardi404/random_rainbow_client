import React from "react";
import { faPersonThroughWindow } from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import DragIcon from "../components/DragIcon";
import Dragbtn from "../components/Dragbtn";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom";

export default function HeaderUserOn() {
  const username = localStorage.getItem("username");
  console.log(localStorage);

  const history = useHistory();
  const { idUser } = useParams();

  function handleDoubleClick(path) {
    history.push(`/${path}`);
  }

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    history.push("/welcome");
  }

  return (
    <div>
      <div className="user-menu">
        <div className="icons-style">
          <DragIcon
            text={username}
            icon={faSmile}
            onDoubleClick={() => handleDoubleClick("videos")}
          />
        </div>
        <div className="icons-style">
          <DragIcon
            text="log-out"
            icon={faPersonThroughWindow}
            onDoubleClick={handleLogout}
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
        <Dragbtn
          name="edit profile"
          onDoubleClick={() => handleDoubleClick("profile")}
        />
      </div>
    </div>
  );
}
