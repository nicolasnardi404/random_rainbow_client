import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
import "../App.css";
import "../Util.css";
import "../styles/RandomCard.css";
import axios from "axios";
import randomButton from "../images/random_button.png";

export default function RandomVideoCard() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [durationOption, setDurationOption] = useState("1000");
  const [loading, setLoading] = useState(false); // Add loading state
  const { token } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (token) {
      fetchVideoByToken(token);
    }
  }, [token]);

  const fetchVideoByToken = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/randomvideo/video/${token}`
      );
      setSelectedVideo(response.data);
    } catch (error) {
      console.error("Failed to fetch video by token:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const selectRandomVideo = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/randomvideo/${durationOption}`
      );
      setSelectedVideo(response.data);
      history.push(`/home/${response.data.endpoint}`);
    } catch (error) {
      console.error("Failed to fetch random video:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Determine the video URL
  const videoUrl = selectedVideo ? selectedVideo.videoLink : "";

  return (
    <div>
      {selectedVideo ? (
        <div>
          <div className="title">*{selectedVideo.title}*</div>
          <div
            className="artist"
            onClick={() => history.push(`/profile/${selectedVideo.username}`)}
          >
            {selectedVideo.username.trim().toUpperCase()}
          </div>
          <div className="player">
            <ReactPlayer
              url={videoUrl}
              controls={true}
              width="100%"
              height="100%"
            />
          </div>
          <div className="description">
            {selectedVideo.videoDescription.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
          <button
            className="btn-random-video btn-random-video-after"
            onClick={selectRandomVideo}
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              "Loading..."
            ) : (
              <img
                src={randomButton}
                alt="RANDOM RAINBOW"
                className="logo-title"
              />
            )}
            {/* Show loading text */}
          </button>
          <img src={randomButton} alt="Random Button" />
          <h2>hey</h2>
        </div>
      ) : (
        <button
          className="btn-random-video"
          onClick={selectRandomVideo}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            "Loading..."
          ) : (
            <img
              src={randomButton}
              alt="Random Button"
              className="random-button"
            />
          )}{" "}
          {/* Show loading text */}
        </button>
      )}
      <div className="duration">
        <label className="duration-label" htmlFor="duration">
          choose max time:
        </label>
        <select
          className="duration-select"
          id="duration"
          value={durationOption}
          onChange={(e) => setDurationOption(e.target.value)}
        >
          <option value="1000">all videos</option>
          <option value="5">less than 5 min</option>
          <option value="10">less than 10 minutes</option>
          <option value="-10">more than 10 minutes</option>
        </select>
      </div>
    </div>
  );
}
