import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import PicOne from '../assets/slide1.png';
import PicTwo from '../assets/slide2.png';
import PicThree from '../assets/slide3.png';
import PicFour from '../assets/slide4.png';
import TextLogo from '../assets/textlogo.png';

import './logIn.css';

const pages = [
  {
    imgSrc: PicOne,
    title: "Learn Local Dialects",
    description: "Dive into the vibrant world of Filipino dialects! Unlock the power of language and connect with the heart of the Philippines in a fun and easy way."
  },
  {
    imgSrc: PicTwo,
    title: "Voice Recognition",
    description: "Get ready to speak like a local! Our thrilling voice recognition feature lets you practice and perfect your pronunciation with instant feedback that makes learning dynamic and fun."
  },
  {
    imgSrc: PicThree,
    title: "Easy Progress Tracking by Word",
    description: "See your language skills soar! Track your progress effortlessly as you conquer new words—watch your achievements grow, one word at a time!"
  },
  {
    imgSrc: PicFour,
    title: "Enjoyable Interactive Quiz Game",
    description: "Level up your learning with our exciting interactive quizzes! Challenge yourself, have a blast, and reinforce your knowledge in a way that’s as fun as it is educational."
  }
];

const OnBoardingPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentPage === pages.length - 1) {
      navigate('/dialecto/onboarding');
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='onboard-page'>
      <div className="onboard-header">
        <img src={TextLogo} alt="Logo" />
        <Link className='onboard-link' to='/dialecto/onboarding'>Skip</Link>
      </div>
      <div className="onboard-content">
        {pages.map((page, index) => 
          index === currentPage ? (
            <div key={index} className='page-container'>
              <div className='page-img'>
                <img src={page.imgSrc} alt={page.title} />
              </div>
              <h3>{page.title}</h3>
              <p>{page.description}</p>
            </div>
          ) : null
        )}
      </div>
      <div className="onboard-btn">
        {currentPage > 0 && <button className='onboard-btn1' onClick={handlePrev}>Back</button>}
        <button className='onboard-btn2' onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default OnBoardingPage;
