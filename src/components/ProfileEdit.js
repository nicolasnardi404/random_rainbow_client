import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { refreshTokenIfNeeded } from "../util/RefreshTokenIfNeeded";

function ProfileEdit() {
  const history = useHistory();
  const [profile, setProfile] = useState({
    artistDescription: "",
    socialMedia: "",
  });
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
    try {
      const newAccessToken = await getUpdatedToken();

      const headers = {
        Authorization: `Bearer ${newAccessToken}`,
        "Content-Type": "application/json",
      };

      // Fetch user profile
      const response = await axios.get(
        `https://random-rainbow-database.onrender.com/api/users/profile/${idUser}`,
        { headers }
      );
      setProfile(response.data);
    } catch (error) {
      console.error("Failed to fetch profile details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idUser]); // Fetch data when `idUser` changes

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        `https://random-rainbow-database.onrender.com/api/users/profile/${idUser}`,
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
    }
  };

  return (
    <div className="edit-profile-style">
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
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileEdit;
