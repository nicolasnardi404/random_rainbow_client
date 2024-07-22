import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../App.css";
import UpdateVideoAdmin from "../components/UpdateVideoAdmin";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";

export default function VideoUpdateAdmin() {
  const history = useHistory();
  const { authToken } = useContext(AuthContext);

  function handleDoubleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        {authToken && authToken !== "" ? <HeaderUserOn /> : <HeaderUserOff />}
        <UpdateVideoAdmin />
      </header>
    </div>
  );
}
