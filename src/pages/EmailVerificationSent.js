import React from "react";
import "../App.css";
const EmailVerificationSent = () => {
  return (
    <div className="App">
      <header className="App-header">
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
