import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ContentOne from './Content_One';
import ContentTwo from './Content_Two';
import ContentThree from './Content_Three';
import ContentHeader from '../components/ContentHeader';
import RetryPopup from '../components/RetryPop';
import NextPopup from '../components/NextPopUp';
import FinalPopup from '../components/FinalPopUp';

import './Content.css';

const GameOne = () => {
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleCorrectAnswer = () => {
        setIsCorrect(true);
        setShowPopup(true);
    };

    const handleIncorrectAnswer = () => {
        setIsCorrect(false);
        setShowPopup(true);
    };

    const handleNextStep = () => {
        setShowPopup(false);
        setCurrentStep(currentStep + 1);
    };

    const handleRetry = () => {
        setShowPopup(false);
    };

    const handleFinish = () => {
        setShowPopup(false);
        navigate(-1);
    };

    const getProgress = () => {
        return (currentStep / 3) * 100;
    };

    return (
        <div className='game-one-container'>

            <div className="game-progress-bar">
                <div className="game-progress" style={{ width: `${getProgress()}%` }}></div>
            </div>

            {currentStep === 1 && (
                <ContentOne onCorrect={handleCorrectAnswer} onIncorrect={handleIncorrectAnswer} />
            )}
            {currentStep === 2 && (
                <ContentTwo onCorrect={handleCorrectAnswer} onIncorrect={handleIncorrectAnswer} />
            )}
            {currentStep === 3 && (
                <ContentThree onCorrect={handleCorrectAnswer} onIncorrect={handleIncorrectAnswer} />
            )}

            {showPopup && (
                isCorrect ? (
                    currentStep === 3 ? (
                        <FinalPopup onFinish={handleFinish} />
                    ) : (
                        <NextPopup onNext={handleNextStep} />
                    )
                ) : (
                    <RetryPopup onRetry={handleRetry} />
                )
            )}
        </div>
    );
};

export default GameOne;
