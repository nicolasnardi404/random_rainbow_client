import React from "react";
import "../styles/Manifesto.css";

export default function HowItWorks() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="manifesto-title">HOW IT WORKS</div>
        <div className="manifesto">
          <h1>
            Random Rainbow is built for accessibility and simplicity. Artists
            can create an account on the platform and share their work by
            uploading up to three video links. On the homepage, a "Random"
            button invites viewers to explore this diverse collection of queer
            video art. Each click calls up a different video from the database,
            ensuring that no two clicks lead to the same experience and no fixed
            order ever appears.
          </h1>
          <h1>
            Designed independently from the ground up, Random Rainbow is a labor
            of love crafted with Java powering the backend, and JavaScript with
            React shaping the frontend experience. This independent digital art
            space is all about exploration, spontaneity, and inclusivity.
          </h1>
          <h1>
            For any questions or technical issues, feel free to reach out to us
            at info@randomrainbow.art
          </h1>
        </div>
      </header>
    </div>
  );
}
