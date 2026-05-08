import "./App.css";
import "./Util.css";
import "./styles/Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./images/logo.png";

function App() {
  return (
    <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <img src={logo} alt="RANDOM RAINBOW" className="logo-title" style={{ maxWidth: "400px", marginTop: "2em" }} />

      <div style={{
        maxWidth: "580px",
        width: "90%",
        margin: "2em auto",
        padding: "2.5em 2em",
        backgroundColor: "rgba(255,255,255,0.85)",
        borderRadius: "12px",
        border: "3px solid #8447FF",
        fontFamily: "lores-9-plus-wide, monospace",
        color: "#E42525",
        textAlign: "center",
        lineHeight: "2",
      }}>
        <p style={{ fontSize: "0.85em", color: "#8447FF", marginBottom: "1.5em" }}>
          2024 · 2026
        </p>

        <p style={{ marginBottom: "1em" }}>
          after almost two years running this project, we've decided to close random rainbow.
        </p>

        <p style={{ marginBottom: "1em" }}>
          we are just two people, working on this for free, out of passion. maintaining the platform became too hard to keep up with and without the time to properly put it out there, it never reached the audience it deserved.
        </p>

        <p style={{ marginBottom: "1em" }}>
          we hope to bring it back one day. for now, we need to step away.
        </p>

        <p style={{ marginBottom: "1em" }}>
          to everyone who shared a video, discovered something unexpected, or just passed by, thank you. it meant more than you know.
        </p>

        <p style={{ marginBottom: "0" }}>
          see you on the other side of the rainbow.
        </p>

        <p style={{ marginTop: "2em", fontSize: "0.75em", color: "#85C7F2" }}>
          the random rainbow team
        </p>
      </div>
    </div>
  );
}

export default App;
