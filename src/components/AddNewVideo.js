import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { refreshTokenIfNeeded } from "../util/RefreshTokenIfNeeded";

function AddNewVideo() {
  const history = useHistory();
  const {
    accessToken,
    refreshToken,
    idUser,
    setAccessTokenLocal,
    setRefreshTokenLocal,
  } = useContext(AuthContext);
  const { videoId } = useParams();
  const [video, setVideo] = useState({
    title: "",
    videoDescription: "",
    videoLink: "",
  });

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const getUpdatedToken = async () => {
    return await refreshTokenIfNeeded({
      accessToken,
      refreshToken,
      setAccessTokenLocal,
      setRefreshTokenLocal,
    });
  };

  useEffect(() => {
    if (videoId) {
      const fetchData = async () => {
        try {
          const token = await getUpdatedToken();
          const response = await axios.get(
            `http://localhost:8080/api/users/${idUser}/videos/${videoId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
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

    let url = `http://localhost:8080/api/users/${idUser}/videos/addNewVideo`;
    let method = "POST";

    if (videoId) {
      url = `http://localhost:8080/api/users/${idUser}/videos/update/${videoId}`;
      method = "PUT";
    }

    try {
      const token = await getUpdatedToken();
      const response = await axios({
        method: method,
        url: url,
        data: payload,
        headers: {
          Authorization: `Bearer ${token}`,
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
