import React from 'react';
import './components.css';

const ProgressCategCard = ({ percentage, bgColor, progIcon, progTitle, numWord, textColor }) => {
  return (
    <div className='progress-card'>
        <div className="progress-card-header">
            <div className="progress-title">
                <ion-icon name={progIcon}></ion-icon>
                <h4>{progTitle}</h4>
            </div>

            <div className="circular-progress"
                style={{
                background: `conic-gradient( ${bgColor} ${percentage * 3.6}deg, rgb(225, 225, 225) 0deg)`,
                }}
            >
                <span className="progress-value" >{percentage}%</span>
            </div>
        </div>
        
        <div className="progress-card-footer">
            <h2 style={{color: textColor}}>total words</h2>
            <h4>{numWord}</h4>
        </div>

    </div>
  );
};

export default ProgressCategCard;
