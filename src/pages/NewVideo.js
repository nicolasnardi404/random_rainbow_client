import React from 'react';
import Dragbtn from '../components/Dragbtn';
import { useHistory } from 'react-router-dom';
import '../App.css';
import { faPersonThroughWindow } from '@fortawesome/free-solid-svg-icons'; 
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import DragIcon from '../components/DragIcon';
import AddNewVideo from '../components/AddNewVideo';

export default function NewVideo () {
  const history = useHistory();

  function handleDoubleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='user-menu'>
            <div className='icons-style'>
                <DragIcon text='USERNAME'icon={faSmile} onDoubleClick={() => handleDoubleClick('videos')} /> 
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
        <AddNewVideo />
      </header>
    </div>
  );
};
