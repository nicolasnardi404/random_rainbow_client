import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";

const EmailVerificationSent = () => {
  const history = useHistory();
  const { accessToken } = useContext(AuthContext);

  function handleDoubleClick(path) {
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
        <div className="email-confirmation">
          <h2 className="email-confirmation-child">
            THANKS FOR JOINING THE RANDOM RAINBOW
          </h2>
          <h3 className="email-confirmation-child">
            check your email for veritification link
          </h3>
          <a
            className="email-confirmation-child none-text-decoration"
            href="/home/0"
          >
            back to homepage
          </a>
        </div>
      </header>
    </div>
  );
};

export default EmailVerificationSent;
