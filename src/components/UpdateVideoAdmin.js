import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { refreshTokenIfNeeded } from "../util/RefreshTokenIfNeeded";

function UpdateVideoAdmin() {
  const history = useHistory();
  const { videoId } = useParams(); // Destructure both idUser and videoId
  const [video, setVideo] = useState({
    title: "",
    videoDescription: "",
    videoLink: "",
  });
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

  // Fetch video data if videoId is present
  useEffect(async () => {
    if (videoId) {
      const token = await getUpdatedToken();
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/admin/videos/${videoId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
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

    let url = `${process.env.REACT_APP_API_BASE_URL}/api/admin/videos/${videoId}`;
    let method = "PUT";

    try {
      const token = await getUpdatedToken();
      const response = await axios({
        method: method,
        url: url,
        data: video,
        headers: {
          Authorization: `Bearer ${token}`,
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
          rows="5"
        />
        <input
          type="text"
          name="videoLink"
          value={video.videoLink}
          onChange={handleChange}
          className="form-control add-video-form"
          placeholder="Video Link"
        />
        <button type="submit" className="default-btn special-btn">
          Save
        </button>
      </form>
    </div>
  );
}

export default UpdateVideoAdmin;
