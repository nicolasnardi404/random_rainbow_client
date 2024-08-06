import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../App.css";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";

const EmailVerified = () => {
  const { authToken } = useContext(AuthContext);
  const history = useHistory();
  const { token } = useParams();

  useEffect(() => {
    fetch(
      `https://random-rainbow-database.onrender.com/api/verify?token=${token}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.url) {
          console.log("verified");
        } else {
          console.error("Email verification failed");
        }
      })
      .catch((error) =>
        console.error("Error during email verification:", error)
      );
  }, [token, history]);

  return (
    <div className="App">
      <header className="App-header">
        {authToken && authToken !== "" ? <HeaderUserOn /> : <HeaderUserOff />}
        <div className="email-confirmation">
          <h2 className="email-confirmation-child">
            WELCOME TO RANDOM RAINBOW
          </h2>
          <h2 className="email-confirmation-child">YOUR EMAIL IS CONFIRMED!</h2>
        </div>
      </header>
    </div>
  );
};

export default EmailVerified;
