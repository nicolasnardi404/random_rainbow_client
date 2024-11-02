import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import VideoList from "../components/VideoList";
import { useParams } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

const UserInterface = () => {
  const { role } = useContext(AuthContext);
  const history = useHistory();
  const { idUser } = useParams();

  const handleAdminButtonClick = () => {
    history.push("/admin-controller");
  };

  return (
    <div className="App">
      <header className="App-header">
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
