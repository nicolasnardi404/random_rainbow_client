// src/components/VideoList.js

import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/AuthContext"; // Adjust the import path as needed
import { refreshTokenIfNeeded } from "../util/RefreshTokenIfNeeded"; // Adjust the import path as needed

const VideoList = () => {
  const history = useHistory();
  const [videos, setVideos] = useState([]);
  const [editingVideo, setEditingVideo] = useState({});
  const [canAddVideo, setCanAddVideo] = useState(true);
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

  async function fetchVideos() {
    try {
      const token = await getUpdatedToken();

      const response = await axios.get(
        `http://localhost:8080/api/users/${idUser}/videos`,
        {
          headers: {
            headers,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userVideos = response.data;
      setVideos(userVideos);
      setCanAddVideo(userVideos.length < 3);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }

  async function handleDelete(videoId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = await refreshTokenIfNeeded({
        accessToken,
        refreshToken,
        setAccessTokenLocal,
        setRefreshTokenLocal,
      });

      await axios.delete(
        `http://localhost:8080/api/users/${idUser}/videos/delete/${videoId}`,
        {
          headers: {
            headers,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchVideos();
    } catch (error) {
      console.error("Failed to delete video:", error);
    }
  }

  async function handleUpdate(videoId) {
    try {
      const token = await getUpdatedToken();

      const response = await axios.get(
        `http://localhost:8080/api/users/${idUser}/videos/${videoId}`,
        {
          headers: {
            headers,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const videoDetails = response.data;
      setEditingVideo(videoDetails);
      history.push(`/${idUser}/update/${videoId}`);
    } catch (error) {
      console.error("Failed to fetch video details:", error);
    }
  }

  useEffect(() => {
    if (idUser) {
      fetchVideos();
    }
  }, [idUser]);

  function handleClick(e) {
    e.preventDefault();
    if (canAddVideo) {
      history.push(`/${idUser}/add-new-video`);
    }
  }

  return (
    <div>
      <table className="table-header">
        <thead>
          <tr>
            <th>Title</th>
            <th>Video Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>{video.title}</td>
              <td>
                {video.videoStatus === "AVAILABLE" ? (
                  <a href={`http://localhost:3000/home/${video.endpoint}`}>
                    View Video
                  </a>
                ) : video.videoStatus === "DOESNT_RESPECT_GUIDELINES" ? (
                  <span>Not Respecting Guidelines</span>
                ) : (
                  <span>Unchecked</span>
                )}
              </td>
              <td>
                <button
                  className="default-btn update-btn"
                  onClick={() => handleUpdate(video.id)}
                >
                  UPDATE
                </button>
                <button
                  className="default-btn delete-btn"
                  onClick={() => handleDelete(video.id)}
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleClick} className="default-btn add-video-btn">
        {canAddVideo ? "ADD NEW VIDEO" : "You cannot add more than 3 videos"}
      </button>
    </div>
  );
};

export default VideoList;
