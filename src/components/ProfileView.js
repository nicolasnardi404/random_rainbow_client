import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfileView = () => {
  const [videos, setVideos] = useState([]);
  const [profileData, setProfileData] = useState({
    dataUserProfile: {},
    username: "",
  });

  const userId = localStorage.getItem("idUser");

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        `https://random-rainbow-database.onrender.com/api/randomvideo/videosbyartist/${userId}`
      );
      const { dataUserProfile, username, listVideos } = response.data;
      setProfileData({ dataUserProfile, username });
      setVideos(listVideos || []);
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  const cleanSocialMediaUrl = (url) => {
    if (!url) return "#";
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div>
      {profileData.username && (
        <p>
          <h1 className="title-username">*{profileData.username}*</h1>
        </p>
      )}
      {profileData.dataUserProfile && (
        <>
          <p className="description-user">
            {profileData.dataUserProfile.artistDescription}
          </p>
          <p>
            <a
              href={cleanSocialMediaUrl(
                profileData.dataUserProfile.socialMedia
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Social Media
            </a>
          </p>
        </>
      )}
      <table className="table-header">
        <thead>
          <tr>
            <th>Title</th>
            <th>Video Link</th>
          </tr>
        </thead>
        <tbody>
          {videos.length > 0 ? (
            videos.map((video) => (
              <tr key={video.id}>
                <td>{video.title}</td>
                <td>
                  {video.videoStatus === "AVAILABLE" ? (
                    <a
                      href={`http://www.randomrainbow.art/home/${video.endpoint}`}
                    >
                      View Video
                    </a>
                  ) : (
                    "Not Available"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No videos available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileView;
