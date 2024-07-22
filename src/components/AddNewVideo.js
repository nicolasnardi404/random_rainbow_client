import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function AddNewVideo() {
  const history = useHistory();
  const { idUser } = useParams();
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
            `http://localhost:8080/api/users/${idUser}/videos/${videoId}`
          );
          setVideo(response.data); // This should trigger a re-render
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

    let url = `http://localhost:8080/api/users/${idUser}/videos/addNewVideo`;
    let method = "POST";

    const { user, ...videoData } = video;

    if (videoId) {
      url = `http://localhost:8080/api/users/${idUser}/videos/update/${videoId}`;
      method = "PUT";
    }

    try {
      const response = await axios({
        method: method,
        url: url,
        data: videoData,
      });

      if (response.status === 200) {
        history.push(`/videos`);
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
          value={video.title} // Displaying the fetched title
          onChange={handleChange}
          className="form-control add-video-form"
          placeholder="Title"
        />
        <textarea
          type="text"
          name="videoDescription"
          value={video.videoDescription}
          onChange={handleChange}
          className="form-control add-video-form"
          placeholder="Description"
          row="5"
        />
        {!videoId && (
          <input
            type="text"
            name="videoLink"
            value={video.videoLink}
            onChange={handleChange}
            className="form-control add-video-form"
            placeholder="Video Link"
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
