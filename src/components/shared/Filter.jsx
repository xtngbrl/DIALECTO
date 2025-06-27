import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AiFillHome } from "react-icons/ai";

import './shared.css';

const HomeIcon = () => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate('/dialecto/home')} className='filter-container'>
            <AiFillHome />
        </div>
    )

}

export default HomeIcon;