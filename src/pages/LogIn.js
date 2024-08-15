import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import LogInForm from "../components/LogInForm";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";

const LogIn = () => {
  const history = useHistory();
  const { accessToken } = useContext(AuthContext);

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
        <LogInForm />
        <button
          className="default-btn "
          onClick={() => handleClick("password-recovery")}
        >
          forgot my password
        </button>
      </header>
    </div>
  );
};

export default LogIn;
