import React from 'react';
import { HiSpeakerWave } from "react-icons/hi2";

import Nano from '../sound_assets/CommonPhrases/Ano_Nano/ANO-NANO.MP3';
import ContentButton from '../components/shared/ContentBtn';

import './Content.css';

const ContentThree = ({ onCorrect, onIncorrect }) => {

  const handleAnswer = (label) => {
    if (label === 'Nano') {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  const handlePlaySound = () => {
    const audio = new Audio(Nano);
    audio.play();
  };

  
  return (
    <div className='content-one-wrapper'>
        <div className='content-title title-three'>Tap what you hear</div>

        <div className='content-one-container'>
            <div className='speaker-container'>
                <h4 className='text-white'>Translated as: Ano</h4>
                <HiSpeakerWave className='speaker-icon' />
                <div className='speaker-btn'>
                    <ContentButton label='Play' onClick={handlePlaySound} />
                </div>
            </div>

            <div className='choices-container'>
                <h2>Choices</h2>
                <div className='btn-choices-container'>
                    <ContentButton label='Buwas' onClick={() => handleAnswer('Choice 1')} />
                    <ContentButton label='Aga' onClick={() => handleAnswer('Choice 2')} />
                    <ContentButton label='Nano' onClick={() => handleAnswer('Nano')} />
                    <ContentButton label='Pusa' onClick={() => handleAnswer('Choice 4')} />
                </div>
            </div>
        </div>
    </div>
  );
}

export default ContentThree;
