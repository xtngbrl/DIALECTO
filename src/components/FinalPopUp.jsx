import React from 'react';

import Finish from '../assets/finish.gif';
import './components.css';

const FinalPopup = ({ onFinish }) => {
    return (
        <div className='popup-container'>
            <div className='popup-content'>
                <img src={Finish} alt="" />
                <button onClick={onFinish}>exit</button>
            </div>
        </div>
    );
};

export default FinalPopup;
