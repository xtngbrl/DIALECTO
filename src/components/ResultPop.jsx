import React from 'react';

import Accuracy from '../assets/result.svg';

import './components.css';

const ResultPopUp = ({ onExit }) => {
    return (
        <div className='popup-container result'>
            <h2>here is your result</h2>
            <img src={Accuracy} alt="" />
            <button onClick={onExit}>exit</button>
        </div>
    )
}

export default ResultPopUp;