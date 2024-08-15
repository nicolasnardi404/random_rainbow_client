import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import VideoList from "../components/VideoList";
import { useParams } from "react-router-dom";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";

const UserInterface = () => {
  const { accessToken, role } = useContext(AuthContext);
  const history = useHistory();
  const { idUser } = useParams();

  function handleClick(path) {
    history.push(`/${path}`);
  }

  const handleAdminButtonClick = () => {
    history.push("/admin-controller");
  };

  return (
    <div className="App">
      <header className="App-header">
        {accessToken && accessToken !== "" ? (
          <HeaderUserOn />
        ) : (
          <HeaderUserOff />
        )}
        <VideoList idUser={idUser} />
        {role === "ROLE_ADMIN" && (
          <button
            className="default-btn"
            onClick={() => handleAdminButtonClick()}
          >
            ADMIN
          </button>
        )}
      </header>
    </div>
  );
};

export default UserInterface;
