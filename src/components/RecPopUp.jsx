import React from 'react';

import AttentionIcon from '../assets/attention.png';

import './components.css';

const RecordPopup = ({ onExit }) => {
    return (
        <div className='popup-container rec-popup'>
            <img src={AttentionIcon} alt='' />
            <h6> <span>Minimize Background Noise:</span> Minimize Background Noise: Choose a quiet environment to reduce any background noise that could interfere with the clarity of your recording.</h6>
            <h6> <span>Use a Mic or Headset:</span> For clearer sound, use a microphone or a good-quality headset.</h6>
            <h6> <span>Stay Consistent: </span> Keep the same distance from the mic to avoid changes in volume.</h6>
            <button onClick={onExit}>Got it</button>
        </div>
    )
};

export default RecordPopup;
