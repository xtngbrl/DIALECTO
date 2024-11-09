import React from 'react';
import './shared.css';

const IconButton = ({ icon, label, width, bgColor, imageUrl, navigateTo }) => {
  const style = {
    width: width,
    backgroundColor: bgColor
  };

  return (
    <button className='icon-btn' style={style} onClick={() => navigateTo()}>
        <div className='icon-btn-container'>
          <img src={imageUrl} alt='icon' />
        </div>
        {label}
    </button>
  );
};

export default IconButton;
