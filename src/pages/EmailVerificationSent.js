import React from 'react';
import Dragbtn from '../components/Dragbtn';
import { useHistory } from 'react-router-dom';
import '../App.css';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import DragIcon from '../components/DragIcon';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const EmailVerificationSent = () => {
  const history = useHistory();

  function handleDoubleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <a href='/welcome' className='app-title '>RANDOM RAINBOW</a> 
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
        <div className='email-confirmation'>
          <h2 className='email-confirmation-child'>THANKS FOR JOINING THE RANDOM RAINBOW</h2>
          <h3 className='email-confirmation-child'>check your email for veritification link</h3>
          <a className='email-confirmation-child none-text-decoration' href='/welcome'>back to homepage</a>
        </div>
      </header>
    </div>
  );
};

export default EmailVerificationSent;