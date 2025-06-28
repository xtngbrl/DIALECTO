import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentButton from '../components/shared/ContentBtn';
import RetryPopup from '../components/RetryPop';
import NextPopup from '../components/NextPopUp';
import FinalPopup from '../components/FinalPopUp';
import Misay from '../sound_assets/Animal/Pusa_Misay/PUSA-MISAY.MP3';
import { HiSpeakerWave } from "react-icons/hi2";
import './Content.css';
import { upsertProgress } from '../services/gameprogService';
import Aga from '../sound_assets/CommonPhrases/Umaga_Aga/UMAGA-AGA.MP3';
import Hain from '../sound_assets/CommonPhrases/Saan_Hain/SAAN-HAIN.MP3';

const ContentOne = ({ onCorrect, onIncorrect }) => {

  const handleAnswer = (label) => {
    if (label === 'Misay') {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  const handlePlaySound = () => {
    const audio = new Audio(Misay);
    audio.play();
  };

  
  return (
    <div className='content-one-wrapper'>
        <div className='content-title title-three'>Tap what you hear</div>

        <div className='content-one-container'>
            <div className='speaker-container'>
                <h4 className='text-white'>Translated as: Pusa</h4>
                <HiSpeakerWave className='speaker-icon' />
                <div className='speaker-btn'>
                    <ContentButton label='Play' onClick={handlePlaySound} />
                </div>
            </div>

            <div className='choices-container'>
                <h2>Choices</h2>
                <div className='btn-choices-container'>
                    <ContentButton label='Yatot' onClick={() => handleAnswer('Choice 1')} />
                    <ContentButton label='Ayam' onClick={() => handleAnswer('Choice 2')} />
                    <ContentButton label='Halas' onClick={() => handleAnswer('Halas')} />
                    <ContentButton label='Misay' onClick={() => handleAnswer('Misay')} />
                </div>
            </div>
        </div>
    </div>
  );
}

const ContentTwo = ({ onCorrect, onIncorrect }) => {

  const handleAnswer = (label) => {
    if (label === 'Aga') {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  const handlePlaySound = () => {
    const audio = new Audio(Aga);
    audio.play();
  };

  
  return (
    <div className='content-one-wrapper'>
        <div className='content-title title-three'>Tap what you hear</div>

        <div className='content-one-container'>
            <div className='speaker-container'>
                <h4 className='text-white'>Translated as: Umaga</h4>
                <HiSpeakerWave className='speaker-icon' />
                <div className='speaker-btn'>
                    <ContentButton label='Play' onClick={handlePlaySound} />
                </div>
            </div>

            <div className='choices-container'>
                <h2>Choices</h2>
                <div className='btn-choices-container'>
                    <ContentButton label='Udto' onClick={() => handleAnswer('Choice 1')} />
                    <ContentButton label='Aga' onClick={() => handleAnswer('Aga')} />
                    <ContentButton label='Gabe' onClick={() => handleAnswer('Halas')} />
                    <ContentButton label='Kulop' onClick={() => handleAnswer('Choice 4')} />
                </div>
            </div>
        </div>
    </div>
  );
}

const ContentThree = ({ onCorrect, onIncorrect }) => {

  const handleAnswer = (label) => {
    if (label === 'Hain') {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  const handlePlaySound = () => {
    const audio = new Audio(Hain);
    audio.play();
  };

  
  return (
    <div className='content-one-wrapper'>
        <div className='content-title title-three'>Tap what you hear</div>

        <div className='content-one-container'>
            <div className='speaker-container'>
                <h4 className='text-white'>Translated as: Saan</h4>
                <HiSpeakerWave className='speaker-icon' />
                <div className='speaker-btn'>
                    <ContentButton label='Play' onClick={handlePlaySound} />
                </div>
            </div>

            <div className='choices-container'>
                <h2>Choices</h2>
                <div className='btn-choices-container'>
                    <ContentButton label='Hain' onClick={() => handleAnswer('Hain')} />
                    <ContentButton label='Buwas' onClick={() => handleAnswer('Aso')} />
                    <ContentButton label='Karuyag' onClick={() => handleAnswer('Halas')} />
                    <ContentButton label='Tawo' onClick={() => handleAnswer('Choice 4')} />
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
        gameType: 'quiz',
        dialect_id: 1,
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

export default GameOnePampang;