import React from "react";
import { useHistory } from "react-router-dom";
import Dragbtn from "../components/Dragbtn";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import DragIcon from "../components/DragIcon";

export default function HeaderUserOff() {
  const history = useHistory();

  function handleDoubleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div>
      <a href="/welcome" className="app-title">
        RANDOM RAINBOW
      </a>
      <div className="icons-group">
        <Dragbtn
          name="manifesto"
          onDoubleClick={() => handleDoubleClick("manifesto")}
        />
        <div className="icons-style">
          <DragIcon
            text="log in"
            icon={faUserAstronaut}
            onDoubleClick={() => handleDoubleClick("log-in")}
          />
        </div>
        <div className="icons-style">
          <DragIcon
            text="sign in"
            icon={faUsers}
            onDoubleClick={() => handleDoubleClick("sign-in")}
          />
        </div>
        <Dragbtn
          name="home"
          onDoubleClick={() => handleDoubleClick("home/0")}
        />
      </div>
    </div>
  );
}
