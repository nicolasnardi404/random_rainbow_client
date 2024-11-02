import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext"; // Adjust the import path as needed
import { refreshTokenIfNeeded } from "../util/RefreshTokenIfNeeded"; // Adjust the import path as needed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function MyPieceOfRandomRainbowVideos() {
  const history = useHistory();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    accessToken,
    refreshToken,
    idUser,
    setAccessTokenLocal,
    setRefreshTokenLocal,
  } = useContext(AuthContext);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setAccessTokenLocal("");
    history.push("/home/0");
  }

  function handleClick(path) {
    history.push(`/${path}`);
  }

  const headers = {
    Authorization: `Bearer ${refreshToken}`,
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

  const handleStatusClick = (video) => {
    if (
      video.videoStatus === "DOESNT_RESPECT_GUIDELINES" ||
      video.videoStatus === "ERROR"
    ) {
      alert(
        `${video.messageError} \nif you want to ask any other question or ask for more info send us an email info@randomrainbow.com`
      );
    }
  };

  async function fetchVideos() {
    setLoading(true);
    try {
      const token = await getUpdatedToken();
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/${idUser}/videos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const videos = response.data;
      setVideos(videos);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setLoading(false); // End loading
    }
  }

  async function handleDelete(videoId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmDelete) {
      return;
    }

    setLoading(true); // Start loading
    try {
      const token = await getUpdatedToken();
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/${idUser}/videos/delete/${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchVideos();
    } catch (error) {
      console.error("Failed to delete video:", error);
      setLoading(false);
    }
  }

  async function handleUpdate(videoId) {
    setLoading(true);
    try {
      const token = await getUpdatedToken();
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/${idUser}/videos/${videoId}`,
        {
          headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      history.push(`/${idUser}/update/${videoId}`);
    } catch (error) {
      console.error("Failed to fetch video details:", error);
    } finally {
      setLoading(false); // End loading
    }
  }

  useEffect(() => {
    if (idUser) {
      fetchVideos();
    }
  }, [idUser]);

  function handleClick(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (videos.length < 3) {
      setLoading(true);
      history.push(`/${idUser}/add-new-video`);
    }
  }

  return (
    <div>
      <button className="default-btn" onClick={() => handleClick("profile")}>
        <FontAwesomeIcon icon={faUserEdit} /> Edit Profile
      </button>
      <button className="default-btn" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
      </button>
      {loading ? (
        <div className="special-title" style={{ border: "none" }}>
          Loading...
        </div>
      ) : (
        <>
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
                <tr key={video.videoId}>
                  <td>{video.title}</td>
                  <td
                    style={{
                      cursor:
                        video.videoStatus === "DOESNT_RESPECT_GUIDELINES" ||
                        video.videoStatus === "ERROR"
                          ? "pointer"
                          : "default",
                    }}
                    onClick={() => handleStatusClick(video)}
                  >
                    {video.videoStatus === "AVAILABLE" ? (
                      <a
                        href={`http://www.randomrainbow.art/home/${video.token}`}
                      >
                        View Video
                      </a>
                    ) : video.videoStatus === "DOESNT_RESPECT_GUIDELINES" ? (
                      <span>Not Respecting Guidelines</span>
                    ) : video.videoStatus === "ERROR" ? (
                      <span className="error-status">Error</span>
                    ) : (
                      <span>Unchecked</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="default-btn update-btn"
                      onClick={() => handleUpdate(video.videoId)}
                    >
                      UPDATE
                    </button>
                    <button
                      className="default-btn delete-btn"
                      onClick={() => handleDelete(video.videoId)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleClick} className="default-btn special-btn">
            {videos.length < 3
              ? "ADD NEW VIDEO"
              : "You cannot add more than 3 videos"}
          </button>
        </>
      )}
    </div>
  );
}
