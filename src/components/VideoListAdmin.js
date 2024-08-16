import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { refreshTokenIfNeeded } from "../util/RefreshTokenIfNeeded";
import "../VideoList.css"; // Import the CSS file

const VideoList = () => {
  const history = useHistory();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [showAllVideos, setShowAllVideos] = useState(true);

  const {
    accessToken,
    refreshToken,
    setAccessTokenLocal,
    setRefreshTokenLocal,
  } = useContext(AuthContext);

  const getUpdatedToken = async () => {
    return await refreshTokenIfNeeded({
      accessToken,
      refreshToken,
      setAccessTokenLocal,
      setRefreshTokenLocal,
    });
  };

  const fetchVideos = async () => {
    setLoading(true); // Start loading
    try {
      const token = await getUpdatedToken();
      const url = showAllVideos
        ? `${process.env.REACT_APP_API_BASE_URL}/api/admin/allvideos`
        : `${process.env.REACT_APP_API_BASE_URL}/api/admin/review`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(response.data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [showAllVideos]);

  const handleDelete = async (videoId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (!confirmDelete) return;

    setLoading(true); // Start loading
    try {
      const token = await getUpdatedToken();
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/admin/videos/${videoId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchVideos();
    } catch (error) {
      console.error("Failed to delete video:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleUpdate = (videoId) => {
    setLoading(true); // Start loading
    history.push(`/admin/videos/update/${videoId}`);
  };

  const handleStatusChange = async (videoId, newStatus) => {
    setLoading(true); // Start loading
    if (newStatus === "AVAILABLE") {
      const duration = prompt("Please enter the video duration (in seconds):");
      if (duration !== null && !isNaN(duration) && duration.trim() !== "") {
        try {
          const token = await getUpdatedToken();
          await axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/api/admin/videos/duration/${videoId}`,
            { duration: parseInt(duration) },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          await axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/api/admin/videos/status`,
            { id: videoId, videoStatus: newStatus },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          fetchVideos();
        } catch (error) {
          console.error("Failed to update video:", error);
        } finally {
          setLoading(false); // End loading
        }
      } else {
        setLoading(false); // End loading if input is invalid
      }
    } else {
      const errorMsg = prompt("Please enter an error message for this video:");
      if (errorMsg !== null && errorMsg.trim() !== "") {
        try {
          const token = await getUpdatedToken();
          await axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/api/admin/videos/status`,
            { id: videoId, videoStatus: newStatus, error: errorMsg },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          fetchVideos();
        } catch (error) {
          console.error("Failed to update video status:", error);
        } finally {
          setLoading(false); // End loading
        }
      } else {
        setLoading(false); // End loading if input is invalid
      }
    }
  };

  const handleActionChange = async (action, videoId) => {
    switch (action) {
      case "delete":
        await handleDelete(videoId);
        break;
      case "update":
        handleUpdate(videoId);
        break;
      default:
        console.log(`Unsupported action: ${action}`);
    }
  };

  const toggleVideoList = () => {
    setShowAllVideos(!showAllVideos);
  };

  return (
    <div className="video-list-container">
      <h1 className="special-title">
        {showAllVideos ? "ALL VIDEOS" : "REVIEW VIDEOS"}
      </h1>
      {loading ? ( // Show loading indicator when loading is true
        <div className="special-title" style={{ border: "none" }}>
          Loading...
        </div>
      ) : videos.length === 0 ? ( // Check if there are no videos to display
        <div className="title">No videos to review</div>
      ) : (
        <div className="video-list-cards">
          {videos.map((video) => (
            <div key={video.id} className="video-card">
              <h2 className="video-title">{video.title}</h2>
              <p className="video-username">{video.user.username}</p>
              <p>
                <select
                  className="video-select"
                  value={video.videoStatus}
                  onChange={(e) => handleStatusChange(video.id, e.target.value)}
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="ERROR">Error</option>
                  <option value="DOESNT_RESPECT_GUIDELINES">
                    Doesn't Respect Guidelines
                  </option>
                  <option value="UNCHECKED">Unchecked</option>
                </select>
              </p>
              <p>
                <h4 className="video-error">
                  {video.messageError ? `Error: ${video.messageError}` : ""}
                </h4>
              </p>
              <p>
                <a
                  href={`http://www.randomrainbow.art/home/${video.endpoint}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Video
                </a>
              </p>
              <div className="video-actions">
                <button
                  className="default-btn update-btn"
                  onClick={() => handleUpdate(video.id)}
                >
                  Update
                </button>
                <button
                  className="default-btn delete-btn"
                  onClick={() => handleDelete(video.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="default-btn special-btn" onClick={toggleVideoList}>
        {showAllVideos ? "GO TO REVIEW VIDEOS" : "GO TO ALL VIDEOS"}
      </button>
    </div>
  );
};

export default VideoList;
