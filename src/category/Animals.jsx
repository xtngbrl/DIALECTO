import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/header';

import A1 from '../assets/a1.png';
import A2 from '../assets/a2.png';
import A3 from '../assets/a3.png';
import A4 from '../assets/a4.png';
import A5 from '../assets/a5.png';
import A6 from '../assets/a6.png';

import CtgButton from '../components/shared/CtgBtn';
import './category.css';
import { FaVolumeUp } from "react-icons/fa"; // Import sound icon


const AnimalCategory = () => {
    const navigate = useNavigate();

    
const array = [
    { label: 'Start', nav: '/dialecto/game-one', pic: A1, progress: 25, hasVoice: true },
    { label: 'Start', nav: '/dialecto/content-four', bgColor: 'aqua', pic: A2, progress: 50, hasVoice: false },
    { label: 'Start', nav: '/dialecto/game-one', bgColor: '#7FBCD2', pic: A3, progress: 75, hasVoice: true },
    { label: 'Start', nav: '/dialecto/content-four', bgColor: '#FFEA20', pic: A4, progress: 10, hasVoice: false },
    { label: 'Start', nav: '/dialecto/game-one', bgColor: '#EDB7ED', pic: A5, progress: 90, hasVoice: true },
    { label: 'Start', nav: '/dialecto/content-four', bgColor: 'lightgreen', pic: A6, progress: 60, hasVoice: false },
];
    return (
        <div className='category-wrapper'>
            <Header showCategoriesButton={true} showSwitchButton={true} />

            <div className='category-slider animal'>
                <div className='category-card-container'>
                    {array.map((arrayItem, index) =>
                    <div className='category-card animal-br' style={{ backgroundColor: arrayItem.bgColor }} key={index}>
                    <div className="ctg-img">
                        <img src={arrayItem.pic} alt="" />
                    </div>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${arrayItem.progress}%` }}></div>
                        <span className="progress-text">{arrayItem.progress}%</span>
                    </div>
                 
                    <CtgButton label={arrayItem.label} navigateTo={() => navigate(arrayItem.nav)} />
                </div>
              
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnimalCategory;