import React from "react";
import "../styles/Manifesto.css";

export default function Manifesto() {
  return (
    <div className="manifesto-container">
      <div className="manifesto-content">
        <div className="manifesto">
          <p>
            Random Rainbow is a{" "}
            <span className="style1">cyber art project</span> born to connect{" "}
            <span className="style2">queer video artists</span> through a{" "}
            <span className="style1">random experience.</span> Built from
            scratch and driven by a desire for{" "}
            <span className="style3">fluid, boundless connection</span>, it
            celebrates chance encounters and{" "}
            <span className="style2">endless possibilities.</span>
          </p>
          <p>
            Random Rainbow believes in{" "}
            <span className="style4">randomness</span> as a{" "}
            <span className="style4">
              radical, non-hierarchical way to explore.
            </span>{" "}
            There is no map, no structure to follow—just an open flow of queer
            creative expression. A <span className="style1">playground</span>{" "}
            beyond the ordinary.
          </p>
          <p>Welcome, press the button and enjoy the journey &lt;3</p>
        </div>
      </div>
    </div>
  );
}
