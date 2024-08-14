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
    idUser,
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
      // Consider adding user-friendly error handling here
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
      fetchVideos(); // Refresh video list
    } catch (error) {
      console.error("Failed to delete video:", error);
    }
  };

  const handleToggleApprove = async (video) => {
    const confirmToggle = window.confirm(
      `Are you sure you want to ${video.videoStatus === "AVAILABLE" ? "cancel" : "approve"} this video?`
    );
    if (!confirmToggle) return;

    try {
      const token = await getUpdatedToken();
      let approveUrl =
        video.videoStatus === "AVAILABLE"
          ? `http://localhost:8080/api/admin/videos/${video.id}/toggle-cancel`
          : `http://localhost:8080/api/admin/videos/${video.id}/toggle-approve`;
      let payload = {};

      if (video.videoStatus === "UNCHECKED") {
        const newDuration = prompt(
          "Please enter the new duration for the video:"
        );
        if (newDuration !== null && newDuration.trim() !== "") {
          payload = { duration: parseInt(newDuration) };
        }
      }

      await axios.put(approveUrl, payload, {
        headers: { ...headers, Authorization: `Bearer ${token}` },
      });
      fetchVideos(); // Refresh video list
    } catch (error) {
      console.error(
        "Failed to toggle approval/cancellation status of video:",
        error
      );
    }
  };

  const handleUpdate = (videoId) => {
    history.push(`/admin/videos/update/${videoId}`);
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
            <th>Approved</th>
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
                {video.videoStatus === "AVAILABLE" ? (
                  <a>Available</a>
                ) : video.videoStatus === "DOESNT_RESPECT_GUIDELINES" ? (
                  <span>Not Respecting Guidelines</span>
                ) : (
                  <span>Unchecked</span>
                )}
              </td>
              <td>
                <button onClick={() => handleToggleApprove(video)}>
                  {video.videoStatus === "AVAILABLE" ? "Disapprove" : "Approve"}
                </button>
                <button onClick={() => handleDelete(video.id)}>Delete</button>
                <button onClick={() => handleUpdate(video.id)}>Update</button>
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
