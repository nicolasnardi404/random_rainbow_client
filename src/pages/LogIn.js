import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import LogInForm from "../components/LogInForm";
const LogIn = () => {
  const history = useHistory();

  function handleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div className="App">
      <header className="App-header">
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
