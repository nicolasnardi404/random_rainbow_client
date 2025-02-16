import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import axios from "axios";

const EmailVerified = () => {
  const { token } = useParams();

  const [isVerified, setIsVerified] = useState(false); // State to manage verification status
  const [verificationError, setVerificationError] = useState(""); // State to manage error message
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const verifyEmail = async () => {
      setLoading(true); // Start loading

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/verify?token=${token}`
        );

        if (response.status === 200) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
          setVerificationError(response.error || "Email verification failed");
        }
      } catch (error) {
        setIsVerified(false);
        setVerificationError("An error occurred during email verification");
      } finally {
        setLoading(false); // End loading
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="email-confirmation">
          {loading ? ( // Display loading message if loading is true
            <h2 className="email-confirmation-child">Loading...</h2>
          ) : isVerified ? ( // Display verification result if not loading
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
