import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const VideoList = () => {
  const history = useHistory();
  const [videos, setVideos] = useState([]);
  const [showAllVideos, setShowAllVideos] = useState(true);

  const fetchVideos = async (url) => {
    try {
      const response = await axios.get(url);
      setVideos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  };

  const handleDelete = async (videoId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/admin/videos/${videoId}`);
      fetchVideos(
        showAllVideos
          ? "http://localhost:8080/api/admin/allvideos"
          : "http://localhost:8080/api/admin/review"
      );
    } catch (error) {
      console.error("Failed to delete video:", error);
    }
  };

  const handleToggleApprove = async (video) => {
    const confirmToggle = window.confirm(
      `Are you sure you want to ${video.videoStatus === "AVAILABLE" ? "cancel" : "approve"} this video?`
    );
    if (!confirmToggle) {
      return;
    }

    try {
      // Determine the URL based on the current videoStatus
      const approveUrl =
        video.videoStatus === "AVAILABLE"
          ? `http://localhost:8080/api/admin/videos/${video.id}/toggle-approve`
          : `http://localhost:8080/api/admin/videos/${video.id}/toggle-cancel`;

      await axios.put(approveUrl);

      // Assuming you have a way to get the new duration from the admin
      const newDuration = prompt(
        "Please enter the new duration for the video:"
      );

      if (newDuration !== null && newDuration.trim() !== "") {
        // Send the duration to the server
        await axios.put(
          `http://localhost:8080/api/admin/videos/duration/${video.id}`,
          {
            duration: parseInt(newDuration),
          }
        );

        await axios.put(
          `http://localhost:8080/api/admin/videos/${video.id}/toggle-approve`
        );

        // Refresh the list of videos
        fetchVideos(
          showAllVideos
            ? "http://localhost:8080/api/admin/allvideos"
            : "http://localhost:8080/api/admin/review"
        );
      }
    } catch (error) {
      console.error(
        "Failed to toggle approval/cancellation status of video or set duration:",
        error
      );
    }
  };

  const handleUpdate = (videoId) => {
    history.push(`/admin/videos/update/${videoId}`);
  };

  useEffect(() => {
    fetchVideos(
      showAllVideos
        ? "http://localhost:8080/api/admin/allvideos"
        : "http://localhost:8080/api/admin/review"
    );
  }, [showAllVideos]);

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
