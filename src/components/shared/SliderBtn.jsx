import React from 'react';

import './shared.css';

const SliderBtn = ({ label, width, padding, bgColor, color, navigateTo, btnStyle }) => {
    const style = {
        width: width,
        padding: padding,
        backgroundColor: bgColor,
        color: color
    };

    const className = btnStyle === 'slider-btn2' ? 'slider-btn slider-btn2' : 'slider-btn slider-btn1';

    return (
        <button className={btnStyle} style={style} onClick={() => navigateTo()}>
            {label}
        </button>
    );
};

export default SliderBtn;
