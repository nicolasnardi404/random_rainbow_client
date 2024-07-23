import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import VideoList from "../components/VideoList";
import Dragbtn from "../components/Dragbtn";
import { useParams } from "react-router-dom";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";

const UserInterface = () => {
  const username = localStorage.getItem("username");
  const { authToken, role } = useContext(AuthContext);
  console.log(role);

  const history = useHistory();
  const { idUser } = useParams();

  function handleDoubleClick(path) {
    history.push(`/${path}`);
  }

  // Function to handle admin button click
  const handleAdminButtonClick = () => {
    history.push("/admin-controller");
  };

  return (
    <div className="App">
      <header className="App-header">
        {authToken && authToken !== "" ? <HeaderUserOn /> : <HeaderUserOff />}
        <VideoList idUser={idUser} />
        <Dragbtn
          name="return"
          onDoubleClick={() => handleDoubleClick("videos")}
        />
        {/* Conditionally render the admin button */}
        {role === "ROLE_ADMIN" && (
          <Dragbtn
            name="ADMIN"
            onDoubleClick={() => handleAdminButtonClick()}
          />
        )}
      </header>
    </div>
  );
};

export default UserInterface;
