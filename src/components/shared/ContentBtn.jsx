import React from 'react';

import './shared.css';

const ContentButton = ({ label, bgColor, onClick }) => {
    const style = {
        backGroundColor: bgColor
    }

    return (
        <button className='content-btn' style={style} onClick={onClick}>{label}</button>
    )
}

export default ContentButton;
