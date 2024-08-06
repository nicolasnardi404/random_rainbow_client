import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function ProfileEdit() {
  const history = useHistory();
  const idUser = localStorage.getItem("idUser");
  const [profile, setProfile] = useState({
    artistDescription: "",
    socialMedia: "",
  });

  useEffect(() => {
    if (idUser) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://random-rainbow-database.onrender.com/api/users/profile/${idUser}`
          );
          const userProfile = response.data;
          setProfile(userProfile);
          console.log(userProfile);
        } catch (error) {
          console.error("Failed to fetch profile details:", error);
        }
      };
      fetchData();
    }
  }, [idUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the JSON payload
    const payload = {
      artistDescription: profile.artistDescription,
      socialMedia: profile.socialMedia,
    };

    const url = `https://random-rainbow-database.onrender.com/api/users/profile/${idUser}`;
    const method = "PUT";

    try {
      const response = await axios({
        method: method,
        url: url,
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        history.push(`/videos`); // Redirect to profiles page or another suitable location
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
