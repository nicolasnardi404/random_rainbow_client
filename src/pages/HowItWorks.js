import React from "react";
import "../styles/Manifesto.css";

export default function HowItWorks() {
  return (
    <div className="App how-it-works-container">
      <header className="App-header">
        <div className="how-it-works">
          <p>
            Random Rainbow is built for accessibility and simplicity. Artists
            can create an account on the platform and share their work by
            uploading up to three video links. On the homepage, a "Random"
            button invites viewers to explore this diverse collection of queer
            video art. Each click calls up a different video from the database,
            ensuring that no two clicks lead to the same experience and no fixed
            order ever appears.
          </p>
          <p>
            Designed independently from the ground up, Random Rainbow is a labor
            of love crafted with Java powering the backend, and JavaScript with
            React shaping the frontend experience. This independent digital art
            space is all about exploration, spontaneity, and inclusivity.
          </p>
          <p>
            For any questions or technical issues, feel free to reach out to us
            at info@randomrainbow.art
          </p>
        </div>
      </header>
    </div>
  );
}
