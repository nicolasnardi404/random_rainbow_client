import { useHistory } from "react-router-dom";
import VideoListAdmin from "../components/VideoListAdmin";
import React, { useContext } from "react";

const AdminController = () => {
  const history = useHistory();

  function handleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <VideoListAdmin />
        <button
          className="default-btn"
          onClick={() => handleClick("my-piece-of-random-rainbow")}
        >
          return
        </button>
      </header>
    </div>
  );
};

export default AdminController;
