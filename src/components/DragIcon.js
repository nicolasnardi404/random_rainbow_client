import React from 'react';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DragIcon = ({ icon, onDoubleClick, text }) => {
  const handleClick = (event) => {
    if (event.detail === 2) {
      onDoubleClick && onDoubleClick(event);
    }
  };

  return (
    <Draggable>
      <div className='icons-style' onClick={handleClick} >
      <FontAwesomeIcon icon={icon} />
      <h4>{text}</h4>
      </div>
    </Draggable>
  );
};

export default DragIcon;
