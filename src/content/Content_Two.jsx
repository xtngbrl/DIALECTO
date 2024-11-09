import React from 'react';

import ContentButton from '../components/shared/ContentBtn';
import GIF from '../assets/logo.gif';

import './Content.css';

const ContentTwo = ({ onCorrect, onIncorrect }) => {

  const handleAnswer = (label) => {
    if (label === 'Karabaw') {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  return (
    <div className='content-one-wrapper'>
        <div className='content-title'>Translate this word</div>

        <div className='content-one-container'>
            <div className='gif-container'>
                <img src={GIF} alt='GIF' />
            </div>

            <div className='choices-container'>
                <h2>Choices</h2>
                <div className='btn-choices-container'>
                  <ContentButton label='Kalabaw' onClick={() => handleAnswer('Kalabaw')} />
                  <ContentButton label='Karabaw' onClick={() => handleAnswer('Karabaw')} />
                  <ContentButton label='Kambing' onClick={() => handleAnswer('Kambing')} />
                  <ContentButton label='Kamote' onClick={() => handleAnswer('Kamote')} />
                </div>
            </div>
        </div>
    </div>
  );
}

export default ContentTwo;
