import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const VideoList = ({}) => {
  const history = useHistory();
  const [videos, setVideos] = useState([]);
  const [editingVideo, setEditingVideo] = useState({});

  const userId = localStorage.getItem("userId");

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${userId}/videos`
      );
      setVideos(response.data);
      console.log(response.data);
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
        `http://localhost:8080/users/${userId}/videos/delete/${videoId}`
      );
      // Refresh the list of videos after deletion
      fetchVideos();
    } catch (error) {
      console.error("Failed to delete video:", error);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchVideos(); // Call fetchVideos on component mount if userId exists
    }
  }, [userId]); // Re-fetch videos whenever the userId changes

  function handleClick(e) {
    e.preventDefault();
    history.push(`/${userId}/add-new-video`); // Include the userId in the navigation
  }

  async function handleUpdate(videoId) {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(
        `http://localhost:8080/users/${userId}/videos/${videoId}`
      );
      const videoDetails = response.data; // Assuming the response contains the video details
      setEditingVideo(videoDetails); // Populate the form with existing video details
      history.push(`/${userId}/update/${videoId}`); // Navigate to the update page
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
            <th>Link</th>
            <th>Checked</th>
            <th>Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>{video.title}</td>
              <td>
                <a
                  href={video.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  video url
                </a>
              </td>
              <td>{video.checked ? "Yes" : "No"}</td>
              <td>{video.approved ? "Yes" : "No"}</td>
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
        ADD NEW VIDEO
      </button>
    </div>
  );
};

export default VideoList;
