import React from 'react';

import ContentButton from '../components/shared/ContentBtn';
import House from '../assets/house.jpg';
import './Content.css';

const ContentOne = ({ onCorrect, onIncorrect }) => {

  const handleAnswer = (label) => {
    if (label === 'Balay') {
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
                <img src={House} alt='House' />
              </div>

              <h2>Bahay</h2>
            </div>

            <div className='choices-container'>
                <h2>Choices</h2>
                <div className='btn-choices-container'>
                  <ContentButton label='Balay' onClick={() => handleAnswer('Balay')} />
                  <ContentButton label='Bugnaw' onClick={() => handleAnswer('Bugnaw')} />
                  <ContentButton label='Karabasa' onClick={() => handleAnswer('Karabasa')} />
                  <ContentButton label='Kan-on' onClick={() => handleAnswer('Kan-on')} />
                </div>
            </div>
        </div>
    </div>
  );
}

export default ContentOne;
