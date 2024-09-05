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
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // Add loading state for submission
  const [fetchingData, setFetchingData] = useState(false); // Add loading state for fetching data

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
        setFetchingData(true); // Start loading when fetching data
        try {
          const token = await getUpdatedToken();
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/users/${idUser}/videos/${videoId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const videos = response.data;
          setVideo(videos);
          console.logs(videos);
        } catch (error) {
          console.error("Failed to fetch video details:", error);
        } finally {
          setFetchingData(false); // End loading after fetching data
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
    setLoading(true); // Start loading when submitting

    // Prepare the JSON payload
    console.log(video);
    const payload = {
      title: video.title,
      videoDescription: video.videoDescription,
      videoLink: video.videoLink,
    };

    let url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${idUser}/videos/addNewVideo`;
    let method = "POST";

    if (videoId) {
      url = `${process.env.REACT_APP_API_BASE_URL}/api/users/${idUser}/videos/update/${videoId}`;
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
      // Set error message to state
      setErrorMessage(
        error.response?.data ||
          "There has been a problem with your fetch operation."
      );
      console.error(
        "There has been a problem with your fetch operation:",
        error.response ? error.response : error.message
      );
    } finally {
      setLoading(false); // End loading after submission
    }
  };

  return (
    <div className="add-video-style">
      {fetchingData ? ( // Show loading indicator when fetching data
        <div className="special-title" style={{ border: "none" }}>
          Loading...
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={video.title} // Displaying the fetched title
            onChange={handleChange}
            className="form-control add-video-form"
            placeholder="Title"
            required
            disabled={loading} // Disable input when saving
          />
          <textarea
            name="videoDescription"
            value={video.videoDescription}
            onChange={handleChange}
            className="form-control add-video-form"
            placeholder="Description"
            rows="5"
            required
            disabled={loading} // Disable textarea when saving
          />
          {!videoId && (
            <input
              type="text"
              name="videoLink"
              value={video.videoLink}
              onChange={handleChange}
              className="form-control add-video-form"
              placeholder="Video Link (youtube/vimeo)"
              required
              disabled={loading} // Disable input when saving
            />
          )}
          <button
            type="submit"
            className="default-btn special-btn"
            disabled={loading} // Disable button when saving
          >
            {loading ? "Saving..." : "Save"} {/* Show loading text */}
          </button>
        </form>
      )}
      {/* Display error message if present */}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
}

export default AddNewVideo;
