import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";

const EmailVerified = () => {
  const { accessToken } = useContext(AuthContext);
  const { token } = useParams();

  const [isVerified, setIsVerified] = useState(false); // State to manage verification status
  const [verificationError, setVerificationError] = useState(""); // State to manage error message

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/verify?token=${token}`
        );
        console.log(response);

        if (response.status === 200) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
          setVerificationError(response.message || "Email verification failed");
        }
      } catch (error) {
        setIsVerified(false);
        setVerificationError("An error occurred during email verification");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="App">
      <header className="App-header">
        {accessToken && accessToken !== "" ? (
          <HeaderUserOn />
        ) : (
          <HeaderUserOff />
        )}
        <div className="email-confirmation">
          {isVerified ? (
            <>
              <h2 className="email-confirmation-child">
                WELCOME TO RANDOM RAINBOW
              </h2>
              <h2 className="email-confirmation-child">
                YOUR EMAIL IS CONFIRMED!
              </h2>
            </>
          ) : (
            <h2 className="email-confirmation-child">{verificationError}</h2>
          )}
        </div>
      </header>
    </div>
  );
};

export default EmailVerified;
