import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const VideoList = () => {
  const history = useHistory();
  const [videos, setVideos] = useState([]);
  const [editingVideo, setEditingVideo] = useState({});
  const [canAddVideo, setCanAddVideo] = useState(true);
  const userId = localStorage.getItem("idUser");
  console.log(userId);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${userId}/videos`
      );
      const userVideos = response.data;
      setVideos(userVideos);
      setCanAddVideo(userVideos.length < 3); // Check if user has less than 3 videos
      console.log(userVideos);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  };

  async function handleDelete(videoId) {
    // Ask for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/api/users/${userId}/videos/delete/${videoId}`
      );
      fetchVideos();
    } catch (error) {
      console.error("Failed to delete video:", error);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchVideos();
    }
  }, [userId]);

  function handleClick(e) {
    e.preventDefault();
    if (canAddVideo) {
      history.push(`/${userId}/add-new-video`);
    }
  }

  async function handleUpdate(videoId) {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${userId}/videos/${videoId}`
      );
      const videoDetails = response.data;
      setEditingVideo(videoDetails);
      history.push(`/${userId}/update/${videoId}`);
      console.log(videoDetails);
    } catch (error) {
      console.error("Failed to fetch video details:", error);
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
