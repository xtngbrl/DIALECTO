import React from 'react';

import './shared.css';

const CtgButton = ({ label, bgColor, navigateTo }) => {
    const style = {
        backGroundColor: bgColor
    }

    return (
        <button className='ctg-btn' style={style} onClick={() => navigateTo()}>
            {label}
        </button>
    )
}

export default CtgButton;