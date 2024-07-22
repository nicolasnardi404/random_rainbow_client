import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import VideoList from "../components/VideoList";
import Dragbtn from "../components/Dragbtn";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";

const UserInterface = () => {
  const username = localStorage.getItem("username");
  const { authToken } = useContext(AuthContext);

  const history = useHistory();
  const { idUser } = useParams();

  function handleDoubleClick(path) {
    history.push(`/${path}`);
  }
  return (
    <div className="App">
      <header className="App-header">
        {authToken && authToken !== "" ? <HeaderUserOn /> : <HeaderUserOff />}
        <VideoList idUser={idUser} />
        <Dragbtn
          name="return"
          onDoubleClick={() => handleDoubleClick("videos")}
        />
      </header>
    </div>
  );
};

export default UserInterface;
