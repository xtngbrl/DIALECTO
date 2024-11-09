import React from 'react';

import { FaFacebookF } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import './admin.css';

const Admin_Footer = () => {
    return (
        <div className='admin-footer'>
            <h3>All rights reserved</h3>
            <div className='footer-icon'>
                <FaFacebookF />
                <MdEmail />
            </div>
        </div>
    );
};

export default Admin_Footer;
