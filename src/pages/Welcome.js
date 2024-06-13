import React from 'react';
import Dragbtn from '../components/Dragbtn';
import { useHistory } from 'react-router-dom';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import BackGroundVideo from '../components/BackGroundVideo';
import DragIcon from '../components/DragIcon';

const Welcome = () => {
  const history = useHistory();

  function handleDoubleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='app-title changing-colors'>RANDOM RAINBOW</h1> 
        <div className='icons-group'>
        <Dragbtn name='manifesto' onDoubleClick={() => handleDoubleClick('manifesto')} />
          <div className='icons-style'>
            <DragIcon text='log in'icon={faUserAstronaut} onDoubleClick={() => handleDoubleClick('log-in')} /> 
          </div>  
          <div className='icons-style'>
            <DragIcon text='sign in'icon={faUsers} onDoubleClick={() => handleDoubleClick('sign-in')} /> 
          </div>
          <Dragbtn name='home' onDoubleClick={() => handleDoubleClick('home')} />
        </div>
        <BackGroundVideo />
      </header>
    </div>
  );
};

export default Welcome;