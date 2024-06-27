import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const VideoList = ({ idUser }) => {
  const history = useHistory();
  const [videos, setVideos] = useState([]);

  console.log('USER ID ' + idUser)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${idUser}/videos`);
        setVideos(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };

    if (idUser) {
      fetchVideos();
    }
  }, [idUser]); // Re-fetch videos whenever the userId changes

  function handleClick(e) {
    e.preventDefault();
    history.push(`/add-new-video/${idUser}`); // Include the userId in the navigation
  }

  return (
    <div>
      <table className='table-header'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Link</th>
            <th>Checked</th>
            <th>Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>{video.title}</td>
              <td>
                <a href={video.videoLink} target="_blank" rel="noopener noreferrer">video url</a>
              </td>
              <td>{video.checked? 'Yes' : 'No'}</td>
              <td>{video.approved? 'Yes' : 'No'}</td>
              <td>
                <button className="default-btn update-btn">UPDATE</button>
                <button className="default-btn delete-btn">DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleClick} className="default-btn add-video-btn">ADD NEW VIDEO</button>
    </div>
  );
};

export default VideoList;
