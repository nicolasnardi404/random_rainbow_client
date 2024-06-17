import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { videoDB } from '../data';
import '../App.css';

export default function RandomVideoCard() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [durationOption, setDurationOption] = useState('all');


  const selectRandomVideo = () => {
    let filteredVideos;
  
    switch (durationOption) {
      case 'lessThan5':
        filteredVideos = videoDB.filter(video => video.duration <= 5); // Assuming duration is in seconds
        break;
      case 'lessThan10':
        filteredVideos = videoDB.filter(video => video.duration <= 10);
        break;
      default:
        filteredVideos = videoDB; // Show all videos if no specific duration is selected
    }
  
    const randomIndex = Math.floor(Math.random() * filteredVideos.length);
    setSelectedVideo(filteredVideos[randomIndex]);
  };
  

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
    },
  };

  return (
    <div>
      {selectedVideo? (
        <div>
          <div className='title'>{selectedVideo.title}</div>
          <div className='artist'>* {selectedVideo.artist} *</div>
          <YouTube videoId={selectedVideo.videoId} opts={opts} />
          <div className='description'>{selectedVideo.description}</div>
          <button className='btn-random-video btn-random-video-after' onClick={selectRandomVideo}>Select Another Video</button>
        </div>
      ) : (
        <button className='btn-random-video' onClick={selectRandomVideo}>🌈 Select a Random Video 🦄 </button>
      )}
       <div className='duration'>
        <label className='duration-label' htmlFor="duration">choose max time:</label>
        <select className='duration-select' id="duration" value={durationOption} onChange={(e) => setDurationOption(e.target.value)}>
          <option value="all">all videos</option>
          <option value="lessThan5">less than 5 min</option>
          <option value="lessThan10">less than 10 minutes</option>
        </select>
      </div>
    </div>
  );
}
