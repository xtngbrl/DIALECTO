import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/header';

import H1 from '../assets/h1.png';
import H2 from '../assets/h2.png';
import H3 from '../assets/h3.png';
import H4 from '../assets/h4.png';
import H5 from '../assets/h5.png';

import CtgButton from '../components/shared/CtgBtn';
import './category.css';

const HouseholdItems = () => {
    const navigate = useNavigate();

    const array = [
        { label: 'Start', nav: '/dialecto/game-one', pic: H1}, 
        { label: 'Start', nav: '/dialecto/content-four', bgColor: 'aqua', pic: H2},
        { label: 'Start', nav: '/dialecto/game-one', bgColor: '#7FBCD2', pic: H3},
        { label: 'Start', nav: '/dialecto/content-four', bgColor: '#FFEA20', pic: H4},
        { label: 'Start', nav: '/dialecto/game-one', bgColor: '#EDB7ED', pic: H5},
        { label: 'Start', nav: '/dialecto/content-four', bgColor: 'lightgreen', pic: H5},
    ]

    return (
        <div className='category-wrapper'>
            <Header showCategoriesButton={true} showSwitchButton={true} />

            <div className='category-slider household'>
                <div className='category-card-container'>
                    {array.map((arrayItem, index) =>
                    <div className='category-card household-br' style={{backgroundColor: arrayItem.bgColor}} key={index}>
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

export default HouseholdItems;