import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/AuthContext"; // Adjust the import path as needed
import { refreshTokenIfNeeded } from "../util/RefreshTokenIfNeeded"; // Adjust the import path as needed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserEdit,
  faSignOutAlt,
  faUser,
  faPenToSquare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/MyPieceOfRandomRainbow.css";

export default function MyPieceOfRandomRainbow() {
  const history = useHistory();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { role, username } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const {
    accessToken,
    refreshToken,
    idUser,
    setAccessTokenLocal,
    setRefreshTokenLocal,
  } = useContext(AuthContext);

  const [expandedVideo, setExpandedVideo] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [videoToDelete, setVideoToDelete] = useState(null);

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
        ? "error-class"
        : ""
    ) {
      setModalMessage(
        `${video.messageError}\n\nFor further inquiries or additional information, please email us at info@randomrainbow.com.`
      );
      setIsModalOpen(true);
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

  const handleDeleteClick = (videoId) => {
    setShowDeleteModal(true);
    setVideoToDelete(videoId);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = await getUpdatedToken();
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/${idUser}/videos/delete/${videoToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setVideos(videos.filter((video) => video.videoId !== videoToDelete));
        setShowDeleteModal(false);
        setVideoToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

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

  function handleClickAdd(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (videos.length < 3) {
      setLoading(true);
      history.push(`/${idUser}/add-new-video`);
    }
  }

  return (
    <div className="App-header">
      <div className="button-container">
        <button className="default-btn" onClick={() => handleClick("profile")}>
          <FontAwesomeIcon icon={faUserEdit} /> Edit Profile
        </button>
        <button
          className="default-btn"
          onClick={() => handleClick(`profile/${username}`)}
        >
          <FontAwesomeIcon icon={faUser} /> View Profile
        </button>
        <button className="default-btn" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
        </button>
      </div>
      {loading ? (
        <div className="special-title" style={{ border: "none" }}>
          Loading...
        </div>
      ) : (
        <>
          <div className="video-list">
            {videos.map((video) => (
              <div
                key={video.videoId}
                className={`video-item ${
                  video.videoStatus === "ERROR" ||
                  video.videoStatus === "DOESNT_RESPECT_GUIDELINES"
                    ? "error-status-item"
                    : ""
                }`}
              >
                <div className="video-title">
                  {video.videoStatus === "AVAILABLE" ? (
                    <a
                      href={`http://www.randomrainbow.art/home/${video.token}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="title-link"
                    >
                      <h3>{video.title}</h3>
                    </a>
                  ) : (
                    <h3>{video.title}</h3>
                  )}
                </div>
                <div className="video-status-container">
                  {video.videoStatus === "AVAILABLE" ? (
                    <a
                      href={`http://www.randomrainbow.art/home/${video.token}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="video-link"
                    >
                      LINK
                    </a>
                  ) : (
                    <span
                      className={`video-status ${
                        video.videoStatus === "ERROR"
                          ? "error-status"
                          : video.videoStatus === "DOESNT_RESPECT_GUIDELINES"
                            ? "guidelines-status"
                            : ""
                      }`}
                      onClick={() => handleStatusClick(video)}
                    >
                      {video.videoStatus}
                    </span>
                  )}
                </div>
                <div className="action-buttons">
                  <button
                    className="icon-btn"
                    onClick={() => handleUpdate(video.videoId)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="icon-btn"
                    onClick={() => handleDeleteClick(video.videoId)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {isModalOpen && (
            <div
              className="modal-overlay"
              onClick={() => setIsModalOpen(false)}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Status Information</h2>
                <p>{modalMessage}</p>
                <button
                  className="modal-close-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <button onClick={handleClickAdd} className="default-btn">
            {videos.length < 3 ? (
              <>
                <FontAwesomeIcon icon={faPlus} /> Add Video
              </>
            ) : (
              "You cannot add more than 3 videos"
            )}
          </button>
          {showDeleteModal && (
            <div
              className="modal-overlay"
              onClick={() => setShowDeleteModal(false)}
            >
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this video?</p>
                <div className="modal-buttons">
                  <button
                    className="modal-btn confirm"
                    onClick={handleDeleteConfirm}
                  >
                    Delete
                  </button>
                  <button
                    className="modal-btn cancel"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {role === "ROLE_ADMIN" && (
        <button
          className="default-btn"
          onClick={() => handleClick("admin-controller")}
        >
          Admin
        </button>
      )}
    </div>
  );
}
