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
  });
  const [loading, setLoading] = useState(true); // Loading state

  const {
    accessToken,
    refreshToken,
    idUser,
    setAccessTokenLocal,
    setRefreshTokenLocal,
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
      setProfile(response.data);
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
    setLoading(true); // Start loading

    const payload = {
      artistDescription: profile.artistDescription,
      socialMedia: profile.socialMedia,
    };

    try {
      const newAccessToken = await getUpdatedToken();

      const headers = {
        Authorization: `Bearer ${newAccessToken}`,
        "Content-Type": "application/json",
      };

      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/profile/${idUser}`,
        payload,
        { headers }
      );

      if (response.status === 200) {
        history.push(`/videos`);
      } else {
        console.error("Failed to save profile:", response);
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error.response ? error.response : error.message
      );
    } finally {
      setLoading(false); // End loading
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
