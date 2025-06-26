import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import SliderBtn from './shared/SliderBtn';
import DialectImg from '../assets/dialect.jpg';
import NotAvail from '../assets/notAvail.png';
import SorryIcon from '../assets/sorryIcon.png';
import './components.css';

// '/dialecto/animal-category' former nav
const array = [
  { pic: DialectImg, btnLabel: 'Play now!', label: 'Waray', nav: '/dialecto/interactive-page', bgColor: '#FFD700', desc: "The Waray language is part of the Austronesian language family and is spoken throughout Samar Island, with some variations between the dialects of Eastern, Northern, and Western Samar. They are the most culturally conservative of the Visayans.", showPopup: false },
  { pic: DialectImg, btnLabel: 'Play now!', label: 'Kapampangan', nav: '/dialecto/interactive-pampanga', bgColor: 'aqua', desc: "Kapampangan is derived from the root word pampáng ('riverbank'). The language was historically spoken in the Kingdom of Tondo, ruled by the Lakans. A number of Kapampangan dictionaries and grammar books were written during the Spanish colonial period.", showPopup: false },
  { pic: DialectImg, btnLabel: 'Play now!', label: 'Cebuano', nav: '/dialecto/interactive-cebu' ,bgColor: '#7FBCD2', desc: "The Cebuano language is a descendant of the hypothesized reconstructed Proto-Philippine language, which in turn descended from Proto-Malayo-Polynesian, making it distantly related to many languages in Maritime Southeast Asia, including Indonesian and Malay.", showPopup: false },
  { pic: DialectImg, btnLabel: 'Play now!', label: 'Ilocano', bgColor: '#A1F54D', desc: "The Ilocano language, also known as Iloco, belongs to the Austronesian language family, specifically within the Malayo-Polynesian branch. It is widely believed to have originated in Taiwan through the Out of Taiwan migration theory.", showPopup: false },
  { pic: NotAvail, btnLabel: 'Play now!', label: 'Bicolano', bgColor: '#EDB7ED', desc: "Description unavailable — this dialect has not been added to the game yet.", showPopup: false },
  { pic: NotAvail, btnLabel: 'Play now!', label: 'Maranao', bgColor: '#FBD78A', desc: "Description unavailable — this dialect has not been added to the game yet", showPopup: false },
];

const CustomSlider = () => {
  const [popups, setPopups] = useState(array.map(item => item.showPopup));
  const navigate = useNavigate();

  const handleBtnClick = (index, nav) => {
    if (nav) {
      navigate(nav);
    } else {
      setPopups(prevPopups => prevPopups.map((popup, i) => i === index ? !popup : popup));
    }
  };

  const handleClosePopup = (index) => {
    setPopups(prevPopups => prevPopups.map((popup, i) => i === index ? false : popup));
  };

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
          nextEl: '.swiper-button-next' || '.swiper-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {array.map((arrayItem, index) => (
          <SwiperSlide key={index} style={{ backgroundColor: arrayItem.bgColor }}
          className={arrayItem.pic === NotAvail ? 'unavailable-slide' : ''}>
            <div className="slider-card">
              <div className="slider-card-img">
                <img src={arrayItem.pic} alt="Dialect" />
              </div>
              <h2>{arrayItem.label}</h2>
              <p>{arrayItem.desc}</p>
              <SliderBtn label={arrayItem.btnLabel} btnStyle={"slider-btn1"} navigateTo={() => handleBtnClick(index, arrayItem.nav)} />
            </div>
            {popups[index] && (
                <div className="slider-dialect-popup">
                  <img src={SorryIcon} alt="" />
                  <p>This dialect is not yet available in the game</p>
                  <button onClick={() => handleClosePopup(index)}>Close</button>
                </div>
              )}
          </SwiperSlide>
        ))}

        <div className="slider-controler">
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default CustomSlider;
