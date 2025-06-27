import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentButton from '../components/shared/ContentBtn';
import RetryPopup from '../components/RetryPop';
import NextPopup from '../components/NextPopUp';
import FinalPopup from '../components/FinalPopUp';
import Help from '../assets/help.png';
import Love from '../assets/love.png';
import Night from '../assets/night.jpg';

import './Content.css';
import { upsertProgress } from '../services/gameprogService';

const ContentOne = ({ onCorrect, onIncorrect }) => {

  const handleAnswer = (label) => {
    if (label === 'Tabang') {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  return (
    <div className='content-one-wrapper'>
        <div className='content-title'>Translate this word</div>

        <div className='content-one-container'>
            <div className='img-wrapper'>
              <div className='img-container'>
              <img src={Help} alt='Snake' />
              </div>

              <h2>Tulong</h2>
            </div>

            <div className='choices-container'>
                <h2>Choices</h2>
                <div className='btn-choices-container'>
                  <ContentButton label='Tabang' onClick={() => handleAnswer('Tabang')} />
                  <ContentButton label='Masubo' onClick={() => handleAnswer('Masubo')} />
                  <ContentButton label='Asa' onClick={() => handleAnswer('Asa')} />
                  <ContentButton label='Gabii' onClick={() => handleAnswer('Gabii')} />
                </div>
            </div>
        </div>
    </div>
  );
}

const ContentTwo = ({ onCorrect, onIncorrect }) => {

  const handleAnswer = (label) => {
    if (label === 'Gugma') {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  return (
    <div className='content-one-wrapper'>
        <div className='content-title'>Translate this word</div>

        <div className='content-one-container'>
            <div className='img-wrapper'>
              <div className='img-container'>
              <img src={Love} alt='Morning' />
              </div>

              <h2>Pag-ibig</h2>
            </div>

            <div className='choices-container'>
                <h2>Choices</h2>
                <div className='btn-choices-container'>
                  <ContentButton label='Gugma' onClick={() => handleAnswer('Gugma')} />
                  <ContentButton label='Lamia' onClick={() => handleAnswer('Lamia')} />
                  <ContentButton label='Kanusa' onClick={() => handleAnswer('Kanusa')} />
                  <ContentButton label='Maaram' onClick={() => handleAnswer('Maaram')} />
                </div>
            </div>
        </div>
    </div>
  );
}

const ContentThree = ({ onCorrect, onIncorrect }) => {

  const handleAnswer = (label) => {
    if (label === 'Gabii') {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  return (
    <div className='content-one-wrapper'>
        <div className='content-title'>Translate this word</div>

        <div className='content-one-container'>
            <div className='img-wrapper'>
              <div className='img-container'>
              <img src={Night} alt='Morning' />
              </div>

              <h2>Gabe</h2>
            </div>

            <div className='choices-container'>
                <h2>Choices</h2>
                <div className='btn-choices-container'>
                  <ContentButton label='Udto' onClick={() => handleAnswer('Udto')} />
                  <ContentButton label='Nindot' onClick={() => handleAnswer('Nindot')} />
                  <ContentButton label='Gabii' onClick={() => handleAnswer('Gabii')} />
                  <ContentButton label='Pila' onClick={() => handleAnswer('Pila')} />
                </div>
            </div>
        </div>
    </div>
  );
}

const GameOneCebu = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0); 

  const handleCorrectAnswer = () => {
    setScore(prev => prev + 1); 
    setIsCorrect(true);
    setShowPopup(true);
  };

  const handleIncorrectAnswer = () => {
    setIsCorrect(false);
    setShowPopup(true);
  };

  const handleNextStep = () => {
    setShowPopup(false);
    setCurrentStep(prev => prev + 1);
  };

  const handleRetry = () => {
    setShowPopup(false);
  };

  const handleFinish = async () => {
    setShowPopup(false);
    try {
      await upsertProgress({
        gameType: 'quiz',
        dialect_id: 3,
        score: score * 10,
        details: {
          totalSteps: 3,
          correctAnswers: score,
          finishedAt: new Date().toISOString()
        }
      });
    } catch (err) {
      console.error("Failed to save progress:", err);
    }

    navigate(-1); 
  };

  const getProgress = () => (currentStep / 3) * 100;

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

export default GameOneCebu;
