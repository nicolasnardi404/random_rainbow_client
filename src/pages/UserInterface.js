import React from 'react';
import {useHistory } from 'react-router-dom';
import VideoList from '../components/VideoList';
import { faPersonThroughWindow } from '@fortawesome/free-solid-svg-icons'; 
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import DragIcon from '../components/DragIcon';
import Dragbtn from '../components/Dragbtn';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

const UserInterface = () => {

  const username  = localStorage.getItem('username');
  console.log(localStorage)
  
  const history = useHistory();
  const { idUser } = useParams();

  function handleDoubleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div className="App">
      <header className="App-header">
      <div className='user-menu'>
            <div className='icons-style'>
                <DragIcon text={username} icon={faSmile} onDoubleClick={() => handleDoubleClick('videos')} /> 
             </div>  
            <div className='icons-style'>
                <DragIcon text='log-out'icon={faPersonThroughWindow} onDoubleClick={() => handleDoubleClick('sign-in')} /> 
            </div>
        </div>
        <h1 className='app-title'>RANDOM RAINBOW</h1> 
        <div className='icons-group'>
        <Dragbtn name='manifesto' onDoubleClick={() => handleDoubleClick('manifesto')} />
          <Dragbtn name='home' onDoubleClick={() => handleDoubleClick('home')} />
        </div>
        <VideoList idUser={idUser} />
        <Dragbtn name='return' onDoubleClick={() => handleDoubleClick('videos')} />
      </header>
    </div>
  );
};

export default UserInterface;
