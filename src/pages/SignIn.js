import React from 'react';
import Dragbtn from '../components/Dragbtn';
import { useHistory } from 'react-router-dom';
import '../App.css';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import DragIcon from '../components/DragIcon';
import SignInForm from '../components/SignInForm';

const SignIn = () => {
  const history = useHistory();

  function handleDoubleClick(path) {
    history.push(`/${path}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <a href='/welcome' className='app-title '>RANDOM RAINBOW</a> 
        <div className='icons-group'>
        <Dragbtn name='back to homepage' onDoubleClick={() => handleDoubleClick('')} />
        </div>
        <div className='icons-style'>
            <DragIcon icon={faUserAstronaut}/> 
        </div>  
        <SignInForm />
      </header>
    </div>
  );
};

export default SignIn;