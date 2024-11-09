import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./components.css";

const WordsProgress = ({ title, easyWords, mediumWords, hardWords, wordIcon, bgColor }) => {
    const [selectedLevel, setSelectedLevel] = useState('showAll');
    const navigate = useNavigate();

    const wordsData = {
        easy: easyWords,
        medium: mediumWords,
        hard: hardWords,
        showAll: [...easyWords, ...mediumWords, ...hardWords]
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLevelChange = (event) => {
        setSelectedLevel(event.target.value);
    };

    return (
        <div className='progress-word-container'>
            <div className="progress-word-title">
                <ion-icon name={wordIcon}></ion-icon>
                <h2>{title}</h2>
            </div>

            <select className="level-select" value={selectedLevel} onChange={handleLevelChange}>
                <option value="showAll">Show All</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            {wordsData[selectedLevel].map((word, index) => (
                <div key={index} className="progress-word-box" onClick={() => handleNavigate(word.path)}>
                    <span className='word-names'>{word.categWord}</span>
                    <div className="progress-word-bar">
                        <span className="progress-per-word" style={{ width: word.wordPercentage, backgroundColor: bgColor }}>
                            <span className="tooltip" style={{ backgroundColor: bgColor, '--tooltip-bg-color': bgColor }}>{word.wordPercentage}</span>
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WordsProgress;
