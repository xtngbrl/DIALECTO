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

const AnimalCategory = () => {
    const navigate = useNavigate();

    const array = [
        { label: 'Start', nav: '/dialecto/game-one', pic: A1}, 
        { label: 'Start', nav: '/dialecto/content-four', bgColor: 'aqua', pic: A2},
        { label: 'Start', nav: '/dialecto/game-one', bgColor: '#7FBCD2', pic: A3},
        { label: 'Start', nav: '/dialecto/content-four', bgColor: '#FFEA20', pic: A4},
        { label: 'Start', nav: '/dialecto/game-one', bgColor: '#EDB7ED', pic: A5},
        { label: 'Start', nav: '/dialecto/content-four', bgColor: 'lightgreen', pic: A6},
    ]

    return (
        <div className='category-wrapper'>
            <Header showCategoriesButton={true} showSwitchButton={true} />

            <div className='category-slider animal'>
                <div className='category-card-container'>
                    {array.map((arrayItem, index) =>
                    <div className='category-card animal-br' style={{backgroundColor: arrayItem.bgColor}} key={index}>
                        <div className="ctg-img">
                            <img src={arrayItem.pic} alt="" />
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