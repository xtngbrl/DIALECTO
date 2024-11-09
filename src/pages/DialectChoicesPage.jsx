import React from 'react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Header from '../components/header';
import Slider from '../components/SliderDialect';
import Kite from '../assets/kite.png';
import Kite1 from '../assets/kite1.png';
import Star from '../assets/star1.png';

import './page.css';

const Home = () => {
    return (
        <div className='home-wrapper'>
            <Header showCategoriesButton={false} showSwitchButton={false} bgColor={"#f4e8dd"} />

            <div className='interactive-slider-container'>
                <Slider />
                {/* <img src={Kite} alt="Kite" className='kite'/>
                <img src={Kite1} alt="Kite" className='kite1'/>
                <img src={Star} alt="Star" className='star'/> */}
            </div>
        </div>
    )
}

export default Home;
