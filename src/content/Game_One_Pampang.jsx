import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentButton from '../components/shared/ContentBtn';
import ContentHeader from '../components/ContentHeader';
import RetryPopup from '../components/RetryPop';
import NextPopup from '../components/NextPopUp';
import FinalPopup from '../components/FinalPopUp';
import HalasAudio from '../sound_assets/Animal/Ahas_Halas/halas1.mp3';
import { HiSpeakerWave } from "react-icons/hi2";
import Handsome from '../assets/handsome.png'
import Morning from '../assets/morning.jpg';

import './Content.css';
import { upsertProgress } from '../services/gameprogService';

const ContentOne = ({ onCorrect, onIncorrect }) => {

  const handleAnswer = (label) => {
    if (label === 'Masanting') {
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
              <img src={Handsome} alt='Snake' />
              </div>

              <h2>Guwapo</h2>
            </div>

            <div className='choices-container'>
                <h2>Choices</h2>
                <div className='btn-choices-container'>
                  <ContentButton label='Kapilan' onClick={() => handleAnswer('Kapilan')} />
                  <ContentButton label='Masanting' onClick={() => handleAnswer('Masanting')} />
                  <ContentButton label='Bengi' onClick={() => handleAnswer('Bengi')} />
                  <ContentButton label='Karela' onClick={() => handleAnswer('Karela')} />
                </div>
            </div>
        </div>
    </div>
  );
}

const ContentTwo = ({ onCorrect, onIncorrect }) => {

  const handleAnswer = (label) => {
    if (label === 'Abak') {
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
              <img src={Morning} alt='Morning' />
              </div>

              <h2>Umaga</h2>
            </div>

            <div className='choices-container'>
                <h2>Choices</h2>
                <div className='btn-choices-container'>
                  <ContentButton label='Mayap' onClick={() => handleAnswer('Mayap')} />
                  <ContentButton label='Masalese' onClick={() => handleAnswer('Masalese')} />
                  <ContentButton label='ika' onClick={() => handleAnswer('ika')} />
                  <ContentButton label='Abak' onClick={() => handleAnswer('Abak')} />
                </div>
            </div>
        </div>
    </div>
  );
}

const ContentThree = ({ onCorrect, onIncorrect }) => {

  const handleAnswer = (label) => {
    if (label === 'Halas') {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  const handlePlaySound = () => {
    const audio = new Audio(HalasAudio);
    audio.play();
  };

  
  return (
    <div className='content-one-wrapper'>
        <div className='content-title title-three'>Tap what you hear</div>

        <div className='content-one-container'>
            <div className='speaker-container'>
                <HiSpeakerWave className='speaker-icon' />
                <div className='speaker-btn'>
                    <ContentButton label='Play' onClick={handlePlaySound} />
                </div>
            </div>

            <div className='choices-container'>
                <h2>Choices</h2>
                <div className='btn-choices-container'>
                    <ContentButton label='Usa' onClick={() => handleAnswer('Choice 1')} />
                    <ContentButton label='Aso' onClick={() => handleAnswer('Choice 2')} />
                    <ContentButton label='Halas' onClick={() => handleAnswer('Halas')} />
                    <ContentButton label='Pusa' onClick={() => handleAnswer('Choice 4')} />
                </div>
            </div>
        </div>
    </div>
  );
}

const GameOnePampang = () => {
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
        gameType: 'match',
        score,
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

export default GameOnePampang;
