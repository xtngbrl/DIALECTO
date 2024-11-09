import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import SliderBtn from './shared/SliderBtn';
import VidThumbnail from '../assets/video.png';

import './components.css'

const SliderStandby = () => {
    const navigate = useNavigate();

    const array = [
        {picture: VidThumbnail, btnLabel: 'Watch now!', label: 'Common Phrases', nav: '/dialecto/video', bgColor: 'var(--primary-color)'}, 
        {picture: VidThumbnail, btnLabel: 'Watch now!', label: 'Meet the animals', nav: '', bgColor: 'var(--primary-color)'},
        {picture: VidThumbnail, btnLabel: 'Watch now!', label: 'What to eat?', nav: '', bgColor: 'var(--primary-color)'},
        {picture: VidThumbnail, btnLabel: 'Watch now!', label: 'What is in my house?', nav: '', bgColor: 'var(--primary-color)'},
        {picture: VidThumbnail, btnLabel: 'Watch now!', label: 'Video Tittle', nav: '', bgColor: 'var(--primary-color)'},
        {picture: VidThumbnail, btnLabel: 'Watch now!', label: 'Video Tittle', nav: '', bgColor: 'var(--primary-color)'},
        ]

  
  return (
    <div className="slider-container">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {array.map((arrayItem, index) => (
          <SwiperSlide key={index} style={{ backgroundColor: arrayItem.bgColor }}>
            <div className="slider-card">
              <div className="slider-card-img">
                <img src={arrayItem.picture} alt="Dialect" />
              </div>
              <h2>{arrayItem.label}</h2>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae ea debitis ipsa qui, quisquam dignissimos nisi totam? Deleniti commodi laborum, suscipit nemo alias consequatur quod dicta quisquam ullam dolorem necessitatibus.</p>
              <SliderBtn label={arrayItem.btnLabel} btnStyle={"slider-btn2"} navigateTo={() => navigate(arrayItem.nav)} />
            </div>
          </SwiperSlide>
        ))}

        <div className="slider-controler">
          {/* <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div> */}
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default SliderStandby;
