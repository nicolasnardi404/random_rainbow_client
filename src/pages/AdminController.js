import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import { refreshTokenIfNeeded } from "../util/RefreshTokenIfNeeded";
import "../styles/AdminController.css"; // Import the CSS file

export default function AdminController() {
  const history = useHistory();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [showAllVideos, setShowAllVideos] = useState(false);

  function handleClick(path) {
    history.push(`/${path}`);
  }

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
      console.log("the data" + JSON.stringify(response.data));
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
    <div className="admin-container">
      <h1 className="admin-title">
        {showAllVideos ? "ALL VIDEOS" : "REVIEW VIDEOS"}
      </h1>
      {loading ? (
        <div className="admin-loading">Loading...</div>
      ) : videos.length === 0 ? (
        <div className="admin-title">No videos to review</div>
      ) : (
        <div className="admin-cards-grid">
          {videos.map((video) => (
            <div key={video.videoId} className="admin-card">
              <h2 className="admin-card-title">{video.title}</h2>
              <p className="admin-card-username">{video.username}</p>
              <select
                className="admin-status-select"
                value={video.videoStatus}
                onChange={(e) =>
                  handleStatusChange(video.videoId, e.target.value)
                }
              >
                <option value="AVAILABLE">Available</option>
                <option value="ERROR">Error</option>
                <option value="DOESNT_RESPECT_GUIDELINES">
                  Doesn't Respect Guidelines
                </option>
                <option value="UNCHECKED">Unchecked</option>
              </select>
              <h4 className="admin-error-message">
                {video.messageError ? `Error: ${video.messageError}` : ""}
              </h4>
              <a
                href={`http://www.randomrainbow.art/home/${video.token}`}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-video-link"
              >
                View Video
              </a>
              <div className="admin-card-actions">
                <button
                  className="admin-btn admin-btn-update"
                  onClick={() => handleUpdate(video.videoId)}
                >
                  Update
                </button>
                <button
                  className="admin-btn admin-btn-delete"
                  onClick={() => handleDelete(video.videoId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="admin-toggle-btn" onClick={toggleVideoList}>
        {showAllVideos ? "GO TO REVIEW VIDEOS" : "GO TO ALL VIDEOS"}
      </button>
      <button
        className="admin-toggle-btn"
        onClick={() => handleClick("my-piece-of-random-rainbow")}
      >
        return
      </button>
    </div>
  );
}
