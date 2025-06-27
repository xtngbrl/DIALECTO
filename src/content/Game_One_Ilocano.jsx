import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentButton from '../components/shared/ContentBtn';
import RetryPopup from '../components/RetryPop';
import NextPopup from '../components/NextPopUp';
import FinalPopup from '../components/FinalPopUp';
import Smile from '../assets/smile.png';
import Pretty from '../assets/pretty.jpg';
import Buying from '../assets/buying.jpg';

import './Content.css';
import { upsertProgress } from '../services/gameprogService';

const ContentOne = ({ onCorrect, onIncorrect }) => {

  const handleAnswer = (label) => {
    if (label === 'Naragsak') {
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
              <img src={Smile} alt='Snake' />
              </div>

              <h2>Masaya</h2>
            </div>

            <div className='choices-container'>
                <h2>Choices</h2>
                <div className='btn-choices-container'>
                  <ContentButton label='Kaapa' onClick={() => handleAnswer('Kaapa')} />
                  <ContentButton label='Naragsak' onClick={() => handleAnswer('Naragsak')} />
                  <ContentButton label='Kaapa' onClick={() => handleAnswer('Kaapa')} />
                  <ContentButton label='Agsapa' onClick={() => handleAnswer('Agsapa')} />
                </div>
            </div>
        </div>
    </div>
  );
}

const ContentTwo = ({ onCorrect, onIncorrect }) => {

  const handleAnswer = (label) => {
    if (label === 'Napintas') {
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
              <img src={Pretty} alt='Morning' />
              </div>

              <h2>Maganda</h2>
            </div>

            <div className='choices-container'>
                <h2>Choices</h2>
                <div className='btn-choices-container'>
                  <ContentButton label='Naapgad' onClick={() => handleAnswer('Naapgad')} />
                  <ContentButton label='Sika' onClick={() => handleAnswer('Sika')} />
                  <ContentButton label='Isuda' onClick={() => handleAnswer('Isuda')} />
                  <ContentButton label='Napintas' onClick={() => handleAnswer('Napintas')} />
                </div>
            </div>
        </div>
    </div>
  );
}

const ContentThree = ({ onCorrect, onIncorrect }) => {

  const handleAnswer = (label) => {
    if (label === 'Pagatang') {
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
              <img src={Buying} alt='Buying' />
              </div>

              <h2>Pabili</h2>
            </div>

            <div className='choices-container'>
                <h2>Choices</h2>
                <div className='btn-choices-container'>
                  <ContentButton label='Kaapa' onClick={() => handleAnswer('Kaapa')} />
                  <ContentButton label='Unget' onClick={() => handleAnswer('Unget')} />
                  <ContentButton label='Pagatang' onClick={() => handleAnswer('Pagatang')} />
                  <ContentButton label='Mano' onClick={() => handleAnswer('Mano')} />
                </div>
            </div>
        </div>
    </div>
  );
}

const GameOneIlocano = () => {
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
        dialect_id: 4,
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

export default GameOneIlocano;
