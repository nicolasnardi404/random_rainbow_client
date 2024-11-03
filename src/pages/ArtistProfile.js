import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ArtistProfile() {
  const { usernameData } = useParams(); // Extract username from the URL
  const [videos, setVideos] = useState([]);
  const [profileData, setProfileData] = useState({
    dataUserProfile: {},
    username: "",
  });
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(""); // State to manage error messages

  const fetchProfileData = async () => {
    setLoading(true); // Start loading
    setError(""); // Reset error state
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/randomvideo/videosbyartist/${usernameData}` // Use username from useParams
      );
      const { dataUserProfile, username, listVideos } = response.data;
      console.log(response.data);
      console.log(username);
      setProfileData({ dataUserProfile, username });
      console.log(profileData);
      setVideos(listVideos || []);
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
      setError("Failed to load profile data."); // Set error message
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    if (usernameData) {
      fetchProfileData(); // Fetch profile data when username is available
    }
  }, [usernameData]);

  const cleanSocialMediaUrl = (url) => {
    if (!url) return "#";
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div className="App-header">
      {loading && (
        <div className="special-title" style={{ border: "none" }}>
          Loading...
        </div>
      )}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          {profileData.username && (
            <h1 className="title-username">*{profileData.username}*</h1>
          )}
          {profileData.dataUserProfile.artistDescription && (
            <div>
              <p className="description-user">
                {profileData.dataUserProfile.artistDescription}
              </p>
            </div>
          )}
          {profileData.dataUserProfile.socialMedia && (
            <div>
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
            </div>
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
        </>
      )}
    </div>
  );
}
