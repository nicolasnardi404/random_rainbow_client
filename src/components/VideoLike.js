import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { refreshTokenIfNeeded } from "../util/RefreshTokenIfNeeded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useReward } from "react-rewards";
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

  const { reward: rainbowReward } = useReward("likeReward", "emoji", {
    emoji: ["🌈"],
    elementCount: 15,
    elementSize: 40,
    spread: 100,
    startVelocity: 35,
    decay: 0.91,
    lifetime: 200,
    zIndex: 999,
  });

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    history.push("/log-in");
  };

  useEffect(() => {
    const fetchLikeInfo = async () => {
      try {
        const config = {};
        if (accessToken) {
          const token = await refreshTokenIfNeeded({
            accessToken,
            refreshToken,
            setAccessTokenLocal,
            setRefreshTokenLocal,
          });
          config.headers = { Authorization: `Bearer ${token}` };
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/videos/${videoId}/like`,
          config
        );

        setLikeCount(response.data.likeCount);
        if (response.data.liked !== undefined) {
          setIsLiked(response.data.liked);
        }
      } catch (error) {
        console.error("Error fetching like info:", error);
      }
    };

    if (videoId) {
      fetchLikeInfo();
    }
  }, [videoId, accessToken]);

  const toggleLike = async () => {
    if (!accessToken) {
      setShowLoginModal(true);
      return;
    }

    if (isLoading) return;

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

      if (response.data) {
        setIsLiked(response.data.liked);
        setLikeCount(response.data.likeCount);

        if (response.data.liked) {
          rainbowReward();
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="video-like-container">
      <span id="likeReward" className="like-button" onClick={toggleLike}>
        <FontAwesomeIcon
          icon={isLiked ? solidHeart : regularHeart}
          className={`heart-icon ${isLiked ? "liked" : ""}`}
        />
        <span className="like-count">{likeCount}</span>
      </span>

      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Please Log In</h2>
            <p>You need to be logged in to like videos.</p>
            <div className="modal-buttons">
              <button
                className="modal-btn confirm"
                onClick={handleLoginRedirect}
              >
                Log In
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
