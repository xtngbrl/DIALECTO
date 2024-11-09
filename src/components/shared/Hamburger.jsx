import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import './shared.css';

const HamburgerMenu = ({ onClick }) => {
    return (
        <div className='hamburger-container' onClick={onClick}>
            <GiHamburgerMenu />
        </div>
    );
};

export default HamburgerMenu;
