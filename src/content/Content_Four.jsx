import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiSpeakerWave } from "react-icons/hi2";
import { FaMicrophone } from "react-icons/fa6";
import yatotAudio from '../sound_assets/Animal/Ahas_Halas/halas1.mp3';
import ContentHeader from '../components/ContentHeader';
import ContentButton from '../components/shared/ContentBtn';
import RecordPopup from '../components/RecPopUp';
import OnRecordingPopUp from '../components/OnRecPop';
import ResultPopUp from '../components/ResultPop';

import './Content.css';


const ContentFour = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showRecordingPopup, setShowRecordingPopup] = useState(false);
    const [showResultPopup, setShowResultPopup] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem('hasSeenPopup');
        if (!hasSeenPopup) {
            setShowPopup(true);
        }
    }, []);

    const handlePlaySound = () => {
        const audio = new Audio(yatotAudio);
        audio.play();
    };

    const handleAttentionIconClick = () => {
        setShowPopup(true);
    };

    const onExit = () => {
        setShowPopup(false);
        localStorage.setItem('hasSeenPopup', 'true');
    };

    const handleRecordClick = () => {
        setShowRecordingPopup(true);
    };

    const handleStopRecording = () => {
        setShowRecordingPopup(false);
    };

    const handleResultClick = () => {
        setShowResultPopup(true)
    }

    const handleExitResult = () => {
        setShowResultPopup(false)
        navigate(-1);
    }

    return (
        <div className='content-one-wrapper four-wrapper'>
            {showPopup && <RecordPopup onExit={onExit} />}
            {showRecordingPopup && <OnRecordingPopUp onStop={handleStopRecording} />}
            {showResultPopup && <ResultPopUp onExit={handleExitResult} />}
            <ContentHeader showAttentionIcon={true} onAttentionIconClick={handleAttentionIconClick} />
            <div></div>
            <div className='content-title four-title'>Listen and Match your Voice</div>

            <div className='content-one-container'>
                <div className='speaker-container'>
                    <HiSpeakerWave className='speaker-icon' />
                    <div className='speaker-btn'>
                        <ContentButton label='Play' onClick={handlePlaySound} />
                    </div>
                </div>

                <div className='mic-container'>
                    <FaMicrophone className='mic-icon' />
                    <div className='mic-btn'>
                        <ContentButton label='Record' onClick={handleRecordClick} />
                        <ContentButton label='Submit' onClick={handleResultClick} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentFour;