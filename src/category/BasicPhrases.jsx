import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/header';

import B1 from '../assets/b1.png';
import B2 from '../assets/b2.png';
import B3 from '../assets/b3.png';
import B4 from '../assets/b4.png';
import B5 from '../assets/b5.png';
import B6 from '../assets/b6.png';

import CtgButton from '../components/shared/CtgBtn';
import './category.css';

const BasicPhrases = () => {
    const navigate = useNavigate();

    const array = [
        { label: 'Start', nav: '/dialecto/game-one', bgColor: 'tomato', pic: B1}, 
        { label: 'Start', nav: '/dialecto/content-four', bgColor: 'aqua', pic: B2},
        { label: 'Start', nav: '/dialecto/game-one', bgColor: '#7FBCD2', pic: B3},
        { label: 'Start', nav: '/dialecto/content-four', bgColor: '#FFEA20', pic: B4},
        { label: 'Start', nav: '/dialecto/game-one', bgColor: '#EDB7ED', pic: B5},
        { label: 'Start', nav: '/dialecto/content-four', bgColor: 'lightgreen', pic: B6},
    ]

    return (
        <div className='category-wrapper'>
            <Header showCategoriesButton={true} showSwitchButton={true} />

            <div className='category-slider basicphrases'>
                <div className='category-card-container'>
                    {array.map((arrayItem, index) =>
                    <div className='category-card basicphrases-br' style={{backgroundColor: arrayItem.bgColor}} key={index}>
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

export default BasicPhrases;