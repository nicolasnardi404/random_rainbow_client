import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function AddNewVideo() {
  const history = useHistory();
  const idUser = localStorage.getItem("idUser");
  const { videoId } = useParams();
  const [video, setVideo] = useState({
    title: "",
    videoDescription: "",
    videoLink: "",
  });

  useEffect(() => {
    if (videoId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://random-rainbow-database.onrender.com/api/users/${idUser}/videos/${videoId}`
          );
          const videos = response.data;
          setVideo(videos); // This should trigger a re-render
        } catch (error) {
          console.error("Failed to fetch video details:", error);
        }
      };
      fetchData();
    }
  }, [videoId]);

  const handleChange = (e) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the JSON payload
    const payload = {
      title: video.title,
      videoDescription: video.videoDescription,
      videoLink: video.videoLink,
    };

    let url = `https://random-rainbow-database.onrender.com/api/users/${idUser}/videos/addNewVideo`;
    let method = "POST";

    if (videoId) {
      url = `https://random-rainbow-database.onrender.com/api/users/${idUser}/videos/update/${videoId}`;
      method = "PUT";
    }

    try {
      const response = await axios({
        method: method,
        url: url,
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        history.push(`/videos`);
      } else {
        console.error("Failed to save video:", response);
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error.response ? error.response : error.message
      );
    }
  };

  return (
    <div className="add-video-style">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={video.title} // Displaying the fetched title
          onChange={handleChange}
          className="form-control add-video-form"
          placeholder="Title"
          required
        />
        <textarea
          type="text"
          name="videoDescription"
          value={video.videoDescription}
          onChange={handleChange}
          className="form-control add-video-form"
          placeholder="Description"
          row="5"
          required
        />
        {!videoId && (
          <input
            type="text"
            name="videoLink"
            value={video.videoLink}
            onChange={handleChange}
            className="form-control add-video-form"
            placeholder="Video Link"
            required
          />
        )}
        <button type="submit" className="btn btn-info">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddNewVideo;
