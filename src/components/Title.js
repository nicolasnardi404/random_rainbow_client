// App.js
import React from 'react';
import '../App.css';

function Title() {
  return (
    <div className="container">
      <svg viewBox="0 0 500 500" className="curve-path">
        <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
        <text x="50%" y="50%" dy=".35em" className="text">Dangerous Curves Ahead</text>
      </svg>
    </div>
  );
}

export default Title;
