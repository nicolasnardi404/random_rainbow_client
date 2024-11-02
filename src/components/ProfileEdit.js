import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { refreshTokenIfNeeded } from "../util/RefreshTokenIfNeeded";

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
    <div className="edit-profile-style">
      {loading ? (
        <div className="special-title" style={{ border: "none" }}>
          Loading...
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
            className="form-control edit-profile-form"
            placeholder="Username"
          />
          <textarea
            type="text"
            name="artistDescription"
            value={profile.artistDescription}
            onChange={(e) =>
              setProfile({ ...profile, artistDescription: e.target.value })
            }
            className="form-control edit-profile-form"
            placeholder="Artist Description"
            rows="5"
          />
          <input
            type="text"
            name="socialMedia"
            value={profile.socialMedia}
            onChange={(e) =>
              setProfile({ ...profile, socialMedia: e.target.value })
            }
            className="form-control edit-profile-form"
            placeholder="Social Media Link"
          />
          <button type="submit" className="default-btn special-btn">
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
}

export default ProfileEdit;
