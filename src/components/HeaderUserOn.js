import React, { useContext } from "react";
import { faPersonThroughWindow } from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import DragIcon from "../components/DragIcon";
import Dragbtn from "../components/Dragbtn";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function HeaderUserOn() {
  const { username, idUser } = useContext(AuthContext);

  const history = useHistory();

  function handleDoubleClick(path) {
    history.push(`/${path}`);
  }

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
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
