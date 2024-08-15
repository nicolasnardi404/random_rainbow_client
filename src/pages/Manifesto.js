import HeaderUserOn from "../components/HeaderUserOn";
import HeaderUserOff from "../components/HeaderUserOff";
import { AuthContext } from "../components/AuthContext";
import React, { useContext } from "react";

export default function Manifesto() {
  const { accessToken } = useContext(AuthContext);
  return (
    <div className="App">
      <header className="App-header">
        {accessToken && accessToken !== "" ? (
          <HeaderUserOn />
        ) : (
          <HeaderUserOff />
        )}
        <div className="manifesto">
          <h1>
            Random Rainbow is a cyber art project designed to connect queer
            video art through a random experience. Any queer artist can join,
            create an account, and upload up to three video links to our
            platform.
          </h1>
          <h1>
            On the homepage, you'll find a "Random" button. Each time it's
            pressed, a video is randomly selected from our database and
            displayed on your screen.
          </h1>
          <h1>
            If you encounter any issues, feel free to reach out to us at
            info@randomrainbow.art.{" "}
          </h1>
          <h1>
            For computer nerds to know: This independent website is built
            entirely from scratch, with Java powering the backend and JavaScript
            with React for the frontend. If you're a fellow tech enthusiast, you
            might appreciate the care that went into crafting this project.
          </h1>
        </div>
      </header>
    </div>
  );
}
