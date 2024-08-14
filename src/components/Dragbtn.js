import React from "react";
import Draggable from "react-draggable";

const Dragbtn = ({ name, onDoubleClick }) => {
  const handleClick = (event) => {
    if (event.detail === 1) {
      onDoubleClick && onDoubleClick(event);
    }
  };

  return (
    <Draggable>
      <button className="default-btn" onClick={handleClick}>
        {name}
      </button>
    </Draggable>
  );
};

export default Dragbtn;
