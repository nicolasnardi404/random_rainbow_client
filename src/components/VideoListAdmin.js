import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { refreshTokenIfNeeded } from "../util/RefreshTokenIfNeeded";

const VideoList = () => {
  const history = useHistory();
  const [videos, setVideos] = useState([]);
  const [showAllVideos, setShowAllVideos] = useState(true);

  const {
    accessToken,
    refreshToken,
    setAccessTokenLocal,
    setRefreshTokenLocal,
  } = useContext(AuthContext);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const getUpdatedToken = async () => {
    return await refreshTokenIfNeeded({
      accessToken,
      refreshToken,
      setAccessTokenLocal,
      setRefreshTokenLocal,
    });
  };

  const fetchVideos = async () => {
    try {
      const token = await getUpdatedToken();
      const url = showAllVideos
        ? "http://localhost:8080/api/admin/allvideos"
        : "http://localhost:8080/api/admin/review";
      const response = await axios.get(url, {
        headers: { ...headers, Authorization: `Bearer ${token}` },
      });
      setVideos(response.data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
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

    try {
      const token = await getUpdatedToken();
      await axios.delete(`http://localhost:8080/api/admin/videos/${videoId}`, {
        headers: { ...headers, Authorization: `Bearer ${token}` },
      });
      fetchVideos();
    } catch (error) {
      console.error("Failed to delete video:", error);
    }
  };

  const handleUpdate = (videoId) => {
    history.push(`/admin/videos/update/${videoId}`);
  };

  const handleStatusChange = async (videoId, newStatus) => {
    if (newStatus === "AVAILABLE") {
      // Prompt for duration
      const duration = prompt("Please enter the video duration (in seconds):");
      if (duration !== null && !isNaN(duration) && duration.trim() !== "") {
        try {
          const token = await getUpdatedToken();
          await axios.put(
            `http://localhost:8080/api/admin/videos/duration/${videoId}`,
            { duration: parseInt(duration) },
            { headers: { ...headers, Authorization: `Bearer ${token}` } }
          );

          // Update status after setting duration
          await axios.put(
            `http://localhost:8080/api/admin/videos/status`,
            { id: videoId, videoStatus: newStatus },
            { headers: { ...headers, Authorization: `Bearer ${token}` } }
          );

          fetchVideos();
        } catch (error) {
          console.error("Failed to update video:", error);
        }
      }
    } else {
      // Prompt for error message
      const errorMsg = prompt("Please enter an error message for this video:");
      if (errorMsg !== null && errorMsg.trim() !== "") {
        try {
          const token = await getUpdatedToken();
          await axios.put(
            `http://localhost:8080/api/admin/videos/status`,
            { id: videoId, videoStatus: newStatus, messageError: errorMsg },
            { headers: { ...headers, Authorization: `Bearer ${token}` } }
          );
          fetchVideos();
        } catch (error) {
          console.error("Failed to update video status:", error);
        }
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
    <div>
      <h1>{showAllVideos ? "ALL VIDEOS" : "REVIEW VIDEOS"}</h1>
      <table className="table-header">
        <thead>
          <tr>
            <th>User</th>
            <th>Title</th>
            <th>Link</th>
            <th>Status</th>
            <th>Error Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>{video.user.username}</td>
              <td>{video.title}</td>
              <td>
                <a
                  href={`http://localhost:3000/home/${video.endpoint}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  video url
                </a>
              </td>
              <td>
                <select
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
              </td>
              <td>{video.messageError}</td>
              <td>
                <select
                  onChange={(e) => handleActionChange(e.target.value, video.id)}
                >
                  <option value="">Select Action</option>
                  <option value="delete">Delete</option>
                  <option value="update">Update</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={toggleVideoList}>
        {showAllVideos ? "GO TO REVIEW VIDEOS" : "GO TO ALL VIDEOS"}
      </button>
    </div>
  );
};

export default VideoList;
