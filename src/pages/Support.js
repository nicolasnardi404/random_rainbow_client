import React, { useEffect } from "react";
import "../styles/Support.css";

export default function Support() {
  useEffect(() => {
    // Load Stripe's Buy Button script
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="support-container">
          {/* <h1 className="support-title">Support Random Rainbow</h1> */}
          <p className="support-text">
            Random Rainbow is an independent platform dedicated to promoting and
            connecting queer video artists. This project is sustained by our
            passion for creating new possibilities on the internet. We have no
            funds or other ways of income for this project. Your support helps
            us maintain and improve the platform.
          </p>

          <div className="donation-options">
            <div className="donation-card">
              <h2>One-time Donation</h2>
              <p>Support us with a one-time contribution</p>
              <stripe-buy-button
                buy-button-id="buy_btn_1PwQaD09kQaCl5xpu4ZIwHKA"
                publishable-key="pk_live_51PwO6M09kQaCl5xpiYwXWc1lE6JSVV8H6a08o0HtO27vHyCP4IKSjxIHAs6HfsW90hdfBB7vMBzpWTO4AXmm6gOP003CShheae"
              ></stripe-buy-button>
            </div>

            <div className="donation-card">
              <h2>Monthly Support</h2>
              <p>Become a recurring supporter</p>
              <stripe-buy-button
                buy-button-id="buy_btn_1QnkR909kQaCl5xp6s8DhSSH"
                publishable-key="pk_live_51PwO6M09kQaCl5xpiYwXWc1lE6JSVV8H6a08o0HtO27vHyCP4IKSjxIHAs6HfsW90hdfBB7vMBzpWTO4AXmm6gOP003CShheae"
              ></stripe-buy-button>
            </div>
          </div>

          <div className="support-info">
            <p>
              For other ways to support or for any questions, please contact us
              at:
              <br />
              <span>info@randomrainbow.art</span>
            </p>
          </div>
        </div>
      </header>
    </div>
  );
}
