import React from "react";
import ImageLogo from './ImageLogo.png';
import './logo.css';

const Logo = () => {
    return (
        <div className="logo-container">
            <img src={ImageLogo} alt='App Logo' className='Logo'/>
        </div>
    )
}

export default Logo;