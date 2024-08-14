import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
import "../App.css";

export default function RandomVideoCard() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [durationOption, setDurationOption] = useState("1000");
  const { token } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (token) {
      fetchVideoByToken(token);
    }
  }, [token]);

  const fetchVideoByToken = async (token) => {
    try {
      const response = await fetch(
        `https://random-rainbow-database.onrender.com/api/randomvideo/video/${token}`
      );
      const videoData = await response.json();
      setSelectedVideo(videoData);
      console.log(videoData);
    } catch (error) {
      console.error("Failed to fetch video by token:", error);
    }
  };

  const selectRandomVideo = async () => {
    try {
      const response = await fetch(
        `https://random-rainbow-database.onrender.com/api/randomvideo/${durationOption}`
      );
      const videoData = await response.json();
      setSelectedVideo(videoData);
      console.log(videoData);

      history.push(`/home/${videoData.endpoint}`);
    } catch (error) {
      console.error("Failed to fetch random video:", error);
    }
  };

  // Determine the video URL
  const videoUrl = selectedVideo ? selectedVideo.videoLink : "";

  return (
    <div>
      {selectedVideo ? (
        <div>
          <div className="title">{selectedVideo.title}</div>
          <div
            className="artist"
            onClick={() =>
              history.push(`/profile/${selectedVideo.user.username}`)
            }
          >
            * {selectedVideo.user.username} *
          </div>
          <div>
            <ReactPlayer
              className="player"
              url={videoUrl}
              controls={true}
              width="640px"
              height="390px"
            />
          </div>
          <div className="description">{selectedVideo.description}</div>
          <button
            className="btn-random-video btn-random-video-after"
            onClick={selectRandomVideo}
          >
            Select Another Video
          </button>
        </div>
      ) : (
        <button className="btn-random-video" onClick={selectRandomVideo}>
          🌈 Select a Random Video 🦄{" "}
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
        </select>
      </div>
    </div>
  );
}
