import React, { useContext } from "react";
import Dragbtn from "../components/Dragbtn";
import { useHistory } from "react-router-dom";
import "../App.css";
import LogInForm from "../components/LogInForm";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";

const LogIn = () => {
  const history = useHistory();
  const { authToken } = useContext(AuthContext);

  function handleDoubleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        {authToken && authToken !== "" ? <HeaderUserOn /> : <HeaderUserOff />}
        <LogInForm />
        <Dragbtn
          name="forgot my password"
          onDoubleClick={() => handleDoubleClick("password-recovery")}
        />
      </header>
    </div>
  );
};

export default LogIn;
