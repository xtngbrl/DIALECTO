import React from 'react';

import { GiHamburgerMenu } from "react-icons/gi";
import AdminLogo from '../assets/ImageLogo.png';

import './admin.css';

const Admin_Header = ({ onClick }) => {
    return (
        <div className='admin-header'>
            <div className='admin-logo'>
                <img src={AdminLogo} alt="Image Logo" />
                <h5>Dialecto Dashboard</h5>
            </div>
            <div className='admin-hamburger' onClick={onClick}>
                <GiHamburgerMenu />
            </div>
        </div>
    );
};

export default Admin_Header;
