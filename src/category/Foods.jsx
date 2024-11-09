import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/header';

import F1 from '../assets/f1.png';
import F2 from '../assets/f2.png';
import F3 from '../assets/f3.png';
import F4 from '../assets/f4.png';
import F5 from '../assets/f5.png';
import F6 from '../assets/f7.png';

import CtgButton from '../components/shared/CtgBtn';
import './category.css';

const FoodCategory = () => {
    const navigate = useNavigate();

    const array = [
        { label: 'Start', nav: '/dialecto/game-one', pic: F1}, 
        { label: 'Start', nav: '/dialecto/content-four', bgColor: 'crimson', pic: F2},
        { label: 'Start', nav: '/dialecto/game-one', bgColor: '#7FBCD2', pic: F3},
        { label: 'Start', nav: '/dialecto/content-four', bgColor: '#FFEA20', pic: F4},
        { label: 'Start', nav: '/dialecto/game-one', bgColor: '#EDB7ED', pic: F5},
        { label: 'Start', nav: '/dialecto/content-four', bgColor: 'lightgreen', pic: F6},
    ]

    return (
        <div className='category-wrapper'>
            <Header showCategoriesButton={true} showSwitchButton={true} />

            <div className='category-slider food'>
                <div className='category-card-container'>
                    {array.map((arrayItem, index) =>
                    <div className='category-card food-br' style={{backgroundColor: arrayItem.bgColor}} key={index}>
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

export default FoodCategory;