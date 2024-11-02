import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import MyPieceOfRandomRainbowVideos from "../components/MyPieceOfRandomRainbowVideos";
import { useParams } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

export default function MyPieceOfRandomRainbow() {
  const { role } = useContext(AuthContext);
  const history = useHistory();
  const { idUser } = useParams();

  const handleAdminButtonClick = () => {
    history.push("/admin-controller");
  };

  return (
    <div className="App">
      <header className="App-header">
        <MyPieceOfRandomRainbowVideos idUser={idUser} />
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
}
