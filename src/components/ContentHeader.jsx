import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa6";
import AttentionIcon from '../assets/attention.png';
import './components.css';

const ContentHeader = ({ height, bgColor, showAttentionIcon, onAttentionIconClick }) => {
    const navigate = useNavigate();
    const style = {
        height: height,
        backgroundColor: bgColor,
    };

    return (
        <div className='content-header-container'>
            <button style={style} onClick={() => navigate(-1)}>
                <FaChevronLeft className='conter-header-icon' />
                <span>Go Back</span>
            </button>
            {showAttentionIcon && (
                <button className='attention-icon' onClick={onAttentionIconClick}>
                    <img src={AttentionIcon} alt="Attention Icon" />
                </button>
            )}
        </div>
    );
};

export default ContentHeader;
