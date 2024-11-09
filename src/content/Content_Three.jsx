import React from 'react';
import { HiSpeakerWave } from "react-icons/hi2";

import HalasAudio from '../sound_assets/Animal/Ahas_Halas/halas1.mp3';
import ContentButton from '../components/shared/ContentBtn';

import './Content.css';

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

export default ContentThree;
