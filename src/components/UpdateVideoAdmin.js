import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function UpdateVideoAdmin() {
  const history = useHistory();
  const { idUser, videoId } = useParams(); // Destructure both idUser and videoId
  const [video, setVideo] = useState({
    title: "",
    videoDescription: "",
    videoLink: "",
  });

  // Fetch video data if videoId is present
  useEffect(() => {
    if (videoId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/admin/videos/${videoId}`
          );
          setVideo(response.data);
        } catch (error) {
          console.error("Failed to fetch video details:", error);
        }
      };
      fetchData();
    }
  }, [videoId]);

  // Handle input change
  const handleChange = (e) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = `http://localhost:8080/api/admin/videos/${videoId}`;
    let method = "PUT";
    console.log(video);

    try {
      const response = await axios({
        method: method,
        url: url,
        data: video,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        history.push(`/admin-controller`);
      } else {
        console.error("Failed to save video:", response);
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  return (
    <div className="add-video-style">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={video.title}
          onChange={handleChange}
          className="form-control add-video-form"
          placeholder="Title"
        />
        <textarea
          name="videoDescription"
          value={video.videoDescription}
          onChange={handleChange}
          className="form-control add-video-form"
          placeholder="Description"
          rows="5" // Corrected attribute name
        />
        <input
          type="text"
          name="videoLink"
          value={video.videoLink}
          onChange={handleChange}
          className="form-control add-video-form"
          placeholder="Video Link"
        />
        <button type="submit" className="btn btn-info">
          Save
        </button>
      </form>
    </div>
  );
}

export default UpdateVideoAdmin;
