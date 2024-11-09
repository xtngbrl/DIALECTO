import React from 'react';

import Correct from '../assets/correct.gif';
import './components.css';

const NextPopup = ({ onNext }) => {
    return (
        <div className='popup-container'>
            <div className='popup-content'>
                <img src={Correct} alt="" />
                <button onClick={onNext}>Proceed</button>
            </div>
        </div>
    );
};

export default NextPopup;
