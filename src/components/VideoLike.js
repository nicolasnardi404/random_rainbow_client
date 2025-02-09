import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { refreshTokenIfNeeded } from "../util/RefreshTokenIfNeeded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import "../styles/VideoLike.css";

const VideoLike = ({ videoId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    accessToken,
    refreshToken,
    setAccessTokenLocal,
    setRefreshTokenLocal,
  } = useContext(AuthContext);
  const history = useHistory();

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    history.push("/log-in");
  };

  const toggleLike = async () => {
    if (!accessToken) {
      setShowLoginModal(true);
      return;
    }

    if (isLoading) return; // Prevent multiple clicks while loading

    try {
      setIsLoading(true);
      const token = await refreshTokenIfNeeded({
        accessToken,
        refreshToken,
        setAccessTokenLocal,
        setRefreshTokenLocal,
      });

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/videos/${videoId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLiked(response.data.liked);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of your existing code ...

  return (
    <div className="video-like-container">
      <button
        className={`like-button ${isLiked ? "liked" : ""} ${isLoading ? "loading" : ""}`}
        onClick={toggleLike}
        disabled={isLoading}
      >
        <FontAwesomeIcon
          icon={isLiked ? solidHeart : regularHeart}
          className={`${isLiked ? "liked-heart" : ""} ${isLoading ? "loading" : ""}`}
        />
        <span className="like-count">{likeCount}</span>
      </button>

      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Sign in Required</h2>
            <p>Want to like this video? Sign in to show your appreciation!</p>
            <div className="modal-buttons">
              <button
                className="modal-btn confirm"
                onClick={handleLoginRedirect}
              >
                Go to Login
              </button>
              <button
                className="modal-btn cancel"
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoLike;
