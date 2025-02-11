import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { refreshTokenIfNeeded } from "../util/RefreshTokenIfNeeded";
import "../styles/VideoComments.css";

const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = seconds / 31536000; // years
  if (interval > 1) return Math.floor(interval) + " years ago";

  interval = seconds / 2592000; // months
  if (interval > 1) return Math.floor(interval) + " months ago";

  interval = seconds / 86400; // days
  if (interval > 1) return Math.floor(interval) + " days ago";

  interval = seconds / 3600; // hours
  if (interval > 1) return Math.floor(interval) + " hours ago";

  interval = seconds / 60; // minutes
  if (interval > 1) return Math.floor(interval) + " minutes ago";

  return Math.floor(seconds) + " seconds ago";
};

const VideoComments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [openMenuCommentId, setOpenMenuCommentId] = useState(null);

  const {
    accessToken,
    refreshToken,
    setAccessTokenLocal,
    setRefreshTokenLocal,
    isAuthenticated,
  } = useContext(AuthContext);

  const userIsAuthenticated =
    isAuthenticated || localStorage.getItem("accessToken");

  const getUpdatedToken = async () => {
    return await refreshTokenIfNeeded({
      accessToken,
      refreshToken,
      setAccessTokenLocal,
      setRefreshTokenLocal,
    });
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/videos/${videoId}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchComments();
    }
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      const token = await getUpdatedToken();
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/videos/${videoId}/comments`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (commentId) => {
    if (!editContent.trim()) return;
    try {
      const token = await getUpdatedToken();
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/videos/${videoId}/comments/${commentId}`,
        { content: editContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEditingCommentId(null);
      setEditContent("");
      fetchComments();
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await getUpdatedToken();
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/videos/${videoId}/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const startEditing = (comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  return (
    <div className="comments-container">
      <h3 className="section-title">comments</h3>
      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="no-comments-message">Be the first to comment!</div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              {editingCommentId === comment.id ? (
                <div className="edit-comment-container">
                  <textarea
                    className="comment-input"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    maxLength={300}
                  />
                  <div className="edit-buttons">
                    <button
                      className="save-btn"
                      onClick={() => handleEdit(comment.id)}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditingCommentId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="comment-header">
                    <div className="comment-meta">
                      <strong className="comment-username">
                        {comment.username}
                      </strong>
                      <span className="comment-date">
                        {getTimeAgo(comment.createdAt)}
                      </span>
                    </div>
                    {userIsAuthenticated &&
                      comment.username === localStorage.getItem("username") && (
                        <div className="more-options">
                          <button
                            className="more-btn"
                            onClick={() =>
                              setOpenMenuCommentId(
                                openMenuCommentId === comment.id
                                  ? null
                                  : comment.id
                              )
                            }
                          >
                            ...
                          </button>
                          {openMenuCommentId === comment.id && (
                            <div className="options-dropdown">
                              <button onClick={() => startEditing(comment)}>
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  handleDelete(comment.id);
                                  setOpenMenuCommentId(null);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                  <p className="comment-content">{comment.content}</p>
                </>
              )}
            </div>
          ))
        )}
      </div>
      {!userIsAuthenticated ? (
        <div className="login-prompt">
          <button
            className="login-btn"
            onClick={() => (window.location.href = "/log-in")}
          >
            Login to comment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="comment-input-container">
          <textarea
            className="comment-input"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            maxLength={300}
            required
          />
          <button
            type="submit"
            className="send-btn"
            disabled={loading || !newComment.trim()}
          >
            {loading ? "Posting..." : "Send"}
          </button>
        </form>
      )}
    </div>
  );
};

export default VideoComments;
