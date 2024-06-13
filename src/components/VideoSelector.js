import React, { useState } from 'react';
import { videoDB } from '../data.js';

const VideoSelector = () => {
  const [filteredVideos, setFilteredVideos] = useState(videoDB); // Initialize with the whole videoDB array
  const [currentVideo, setCurrentVideo] = useState(null);

  const chooseVideo = () => {
    const randomNumber = Math.floor(Math.random() * filteredVideos.length);
    const videoScreening = filteredVideos[randomNumber];
    setCurrentVideo(videoScreening);
  };

  const handleLengthChange = (event) => {
    const selectedLength = parseInt(event.target.value);

    if (selectedLength === 5) {
      setFilteredVideos(videoDB.filter((video) => video.length <= 5));
    } else if (selectedLength === 10) {
      setFilteredVideos(videoDB.filter((video) => video.length <= 10));
    } else if (selectedLength === 11) {
      setFilteredVideos(videoDB); // Assign the entire videoDB array
    }

    chooseVideo();
  };

  return (
    <div>
      <button onClick={chooseVideo}>RANDOM VIDEO GENERATOR</button>
      <select onChange={handleLengthChange} value={currentVideo?.length || ''}>
        <option value="5">&lt;5</option>
        <option value="10">&lt;10</option>
        <option value="morethan10" selected>all</option>
      </select>

      {currentVideo && (
        <>
          {/* Adjusted to use an iframe for YouTube video */}
          {/* <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${currentVideo.videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe> */}
          <h2>{currentVideo.title}</h2>
          <p>by {currentVideo.artist}</p>
          <p>{currentVideo.description}</p>
        </>
      )}
    </div>
  );
};

export default VideoSelector;
