import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import YouTube from "react-youtube";
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
        `http://localhost:8080/api/randomvideo/video/${token}`
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
        `http://localhost:8080/api/randomvideo/${durationOption}`
      );
      const videoData = await response.json();
      setSelectedVideo(videoData);
      console.log(videoData);

      history.push(`/home/${videoData.endpoint}`);
    } catch (error) {
      console.error("Failed to fetch random video:", error);
    }
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
    },
  };

  const uniqueVideoUrl = selectedVideo
    ? `${selectedVideo.endpoint}/${selectedVideo.videoId}`
    : "";

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
          <YouTube endpoint={uniqueVideoUrl} opts={opts} />
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
