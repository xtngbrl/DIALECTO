import React from 'react';

import Listening from '../assets/listen.png';

import './components.css';

const OnRecordingPopUp = ({ onStart, onStop }) => {
    return (
        <div className='popup-container onrec'>
            <h2>Record your voice</h2>
            <img src={Listening} alt="" />
            <div className='onrec-btn'>
                <button onClick={onStart}>Start</button>
                <button onClick={onStop}>Stop</button>
            </div>
        </div>
    )
}

export default OnRecordingPopUp;