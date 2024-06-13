import React from 'react';
import Dragbtn from '../components/Dragbtn';
import { useHistory } from 'react-router-dom';
import '../App.css';
import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css'

const Welcome = () => {
  const history = useHistory();

  function handleDoubleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='app-title'>RANDOM RAINBOW</h1> 
        <div className='navBar-group-btn'>
          <Dragbtn name='about' onDoubleClick={() => handleDoubleClick('about')} />
          <Dragbtn name='home' onDoubleClick={() => handleDoubleClick('home')} />
          <Dragbtn name='sign-in' onDoubleClick={() => handleDoubleClick('sign-in')} />
          <FontAwesomeIcon icon="fa-solid fa-user-astronaut" />
        </div>
      </header>
    </div>
  );
};

export default Welcome;
