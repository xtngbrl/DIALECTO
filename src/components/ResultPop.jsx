import React from 'react';
import './components.css';

const ResultPopUp = ({ onExit, accuracy, isMatch }) => {
    // Clamp accuracy between 0 and 100
    const percent = Math.max(0, Math.min(accuracy, 100));

    return (
        <div className='popup-container result'>
            <h2>Your Accuracy</h2>
            <div className="accuracy-percentage">{percent.toFixed(1)}%</div>
            <div className="accuracy-bar-outer">
                <div
                    className="accuracy-bar-inner"
                    style={{ width: `${percent}%` }}
                />
            </div>
            <div style={{ margin: '16px 0', fontWeight: 600, color: isMatch ? '#2ecc40' : '#ff4136' }}>
                {isMatch === null
                    ? ''
                    : isMatch
                        ? 'Great job! Your voice matches!'
                        : 'Try again! Your voice did not match closely enough.'}
            </div>
            <button onClick={onExit}>Exit</button>
        </div>
    );
};

export default ResultPopUp;