import { useHistory } from "react-router-dom";
import VideoListAdmin from "../components/VideoListAdmin";
import { useParams } from "react-router-dom";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";
import React, { useContext } from "react";

const AdminController = () => {
  const username = localStorage.getItem("username");
  const { accessToken, role } = useContext(AuthContext);

  const history = useHistory();
  const { idUser } = useParams();

  function handleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        {accessToken && accessToken !== "" ? (
          <HeaderUserOn />
        ) : (
          <HeaderUserOff />
        )}
        <VideoListAdmin />
        <button className="default-btn" onClick={() => handleClick("videos")}>
          return
        </button>
      </header>
    </div>
  );
};

export default AdminController;
