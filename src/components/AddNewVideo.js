import React, { useState } from 'react';
import '../App.css'; // Assuming you want to style it similarly to Bootstrap
import { useHistory } from 'react-router-dom';

export default function AddNewVideo() {

  const history = useHistory();

  function handleClick(e){
      e.preventDefault();
      history.push('/videos')
  }

  const [video, setVideo] = useState({
    title: '',
    videoDescription: '',
    videoLink: ''
  });


  //java connection
  const handleChange = (e) => {
    setVideo({...video, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="add-video-style">
      <hr />
      <h3>Add New Video</h3>
      <form onSubmit={handleClick}>
        {/* Add hidden form field to handle the update */}
        <input type="hidden" name="id" value={video.id || ''} />

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
          row='5'
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

        <button type="submit" className="btn btn-info">Save</button>
      </form>
      <hr />
      <a href="/videos">Back to Videos List</a>
    </div>
  );
};
