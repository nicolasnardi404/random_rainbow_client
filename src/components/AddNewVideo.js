import React, { useState } from "react";
import "../App.css";
import { useHistory, useParams } from "react-router-dom";

export default function AddNewVideo() {
  const history = useHistory();
  const { idUser } = useParams();

  function handleClick(e) {
    e.preventDefault();
    history.push("/videos");
  }

  const [video, setVideo] = useState({
    title: "",
    videoDescription: "",
    videoLink: "",
  });

  //java connection
  const handleChange = (e) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/users/${idUser}/videos/addNewVideo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(video),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Redirect to videos page after successful submission
      history.push("/videos");
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  return (
    <div className="add-video-style">
      <hr />
      <h3>Add New Video</h3>
      <form onSubmit={handleSubmit}>
        {/* Add hidden form field to handle the update */}
        <input type="hidden" name="id" value={video.id || ""} />

        <input
          type="text"
          name="title"
          value={video.title}
          onChange={handleChange}
          className="form-control add-video-form"
          placeholder="Title"
        />
        <textarea
          type="text"
          name="videoDescription"
          value={video.videoDescription}
          onChange={handleChange}
          className="form-control add-video-form"
          placeholder="Description"
          row="5"
        />
        <input
          type="text"
          name="videoLink"
          value={video.videoLink}
          onChange={handleChange}
          className="form-control add-video-form"
          placeholder="Video Link"
        />

        {/* Error handling can be implemented similarly */}

        <button type="submit" className="btn btn-info">
          Save
        </button>
      </form>
      <hr />
      <a href="/videos">Back to Videos List</a>
    </div>
  );
}
