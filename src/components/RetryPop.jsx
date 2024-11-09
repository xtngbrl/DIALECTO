import React from 'react';

import Retry from '../assets/wrong.gif';
import './components.css';

const RetryPopup = ({ onRetry }) => {
    return (
        <div className='popup-container'>
            <div className='popup-content'>
                <img src={Retry} alt="" />
                <button onClick={onRetry}>try again</button>
            </div>
        </div>
    );
};

export default RetryPopup;
