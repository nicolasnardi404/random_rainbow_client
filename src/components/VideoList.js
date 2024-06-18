import React from 'react';
import { faker } from '@faker-js/faker/locale/en';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


const VideoList = () => {
  const history = useHistory();

  function handleClick(e){
      e.preventDefault();
      history.push('/add-new-video')
  }

 //generate fake data for testing
  const videos = Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    title: faker.system.commonFileName(),
    videoDescription: faker.lorem.paragraph(),
    videoLink: `https://example.com/video/${index}`,
    checked: faker.datatype.boolean(),
    approved: faker.datatype.boolean(),
  }));

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
