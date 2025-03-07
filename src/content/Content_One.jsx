import React from 'react';

import ContentButton from '../components/shared/ContentBtn';
import Snake from '../assets/snek.png';
import './Content.css';

const ContentOne = ({ onCorrect, onIncorrect }) => {

  const handleAnswer = (label) => {
    if (label === 'Halas') {
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
              <img src={Snake} alt='Snake' />
              </div>

              <h2>Ahas</h2>
            </div>

            <div className='choices-container'>
                <h2>Choices</h2>
                <div className='btn-choices-container'>
                  <ContentButton label='Halas' onClick={() => handleAnswer('Halas')} />
                  <ContentButton label='Bugnaw' onClick={() => handleAnswer('Bugnaw')} />
                  <ContentButton label='Haba' onClick={() => handleAnswer('Haba')} />
                  <ContentButton label='Ekans' onClick={() => handleAnswer('Ekans')} />
                </div>
            </div>
        </div>
    </div>
  );
}

export default ContentOne;
