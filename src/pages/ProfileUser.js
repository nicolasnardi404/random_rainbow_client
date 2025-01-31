import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import { refreshTokenIfNeeded } from "../util/RefreshTokenIfNeeded";
import "../styles/ProfileUser.css";

function ProfileEdit() {
  const history = useHistory();
  const [profile, setProfile] = useState({
    artistDescription: "",
    socialMedia: "",
    username: "", // Add username to the state
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Add error state

  const {
    accessToken,
    refreshToken,
    idUser,
    setAccessTokenLocal,
    setRefreshTokenLocal,
    setUsername, // Add this
  } = useContext(AuthContext);

  const getUpdatedToken = async () => {
    const newAccessToken = await refreshTokenIfNeeded({
      accessToken,
      refreshToken,
      setAccessTokenLocal,
      setRefreshTokenLocal,
    });
    return newAccessToken;
  };

  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      const newAccessToken = await getUpdatedToken();

      const headers = {
        Authorization: `Bearer ${newAccessToken}`,
        "Content-Type": "application/json",
      };

      // Fetch user profile
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/profile/${idUser}`,
        { headers }
      );
      setProfile({
        ...response.data,
        username: response.data.username || "", // Add username to the fetched data
      });
    } catch (error) {
      console.error("Failed to fetch profile details:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    if (idUser) {
      fetchData();
    }
  }, [idUser]); // Fetch data when `idUser` changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const newAccessToken = await getUpdatedToken();
      const headers = {
        Authorization: `Bearer ${newAccessToken}`,
        "Content-Type": "application/json",
      };

      // Check if username is being changed
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/profile/${idUser}`,
        { headers }
      );

      const currentUsername = response.data.username;

      const updateResponse = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/update-profile/${idUser}`,
        {
          username: profile.username,
          artistDescription: profile.artistDescription,
          socialMedia: profile.socialMedia,
        },
        { headers }
      );

      if (updateResponse.data.accessToken) {
        setUsername(profile.username);
        setAccessTokenLocal(updateResponse.data.accessToken);
        setRefreshTokenLocal(updateResponse.data.refreshToken);
      }

      history.push("/my-piece-of-random-rainbow");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(
        error.response?.data || "An error occurred while updating the profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App-header">
      {loading ? (
        <div className="special-title">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <div className="form-group">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              name="username"
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
              className="form-control add-video-form"
              placeholder="..."
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="artistDescription">ARTIST DESCRIPTION</label>
            <textarea
              id="artistDescription"
              name="artistDescription"
              value={profile.artistDescription}
              onChange={(e) =>
                setProfile({ ...profile, artistDescription: e.target.value })
              }
              className="form-control add-video-form"
              placeholder="..."
              rows="5"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="socialMedia">SOCIAL MEDIA LINK</label>
            <input
              type="text"
              id="socialMedia"
              name="socialMedia"
              value={profile.socialMedia}
              onChange={(e) =>
                setProfile({ ...profile, socialMedia: e.target.value })
              }
              className="form-control add-video-form"
              placeholder="..."
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="default-btn special-btn save-video-btn"
            disabled={loading}
          >
            {loading ? "Updating..." : "UPDATE PROFILE"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ProfileEdit;
