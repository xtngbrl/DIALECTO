import React from 'react';
import Squares from '../components/InteractiveBg';
import Header from '../components/header';
import { useNavigate } from 'react-router-dom';
import './page.css';

function InteractivePampanga() {
    const navigate = useNavigate();

    const cardData = [
        { title: "Word Shooter", description: "Take aim and fire! Let’s go!", nav: "/dialecto/word-shooter-ilocano" },
        { title: "Jumble Fix", description: "Think fast! Spell faster!", nav: "/dialecto/word-scramble-ilocano" },
        { title: "Voice Match", description: "Speak up! Can you match the sound?", nav: "/dialecto/speech-game-ilocano"  },
        { title: "Quiz Quest", description: "Let’s test your knowledge! Ready?", nav: "/dialecto/game-one-ilocano" },
        { title: "Letter Hunt", description: "Find the missing piece! Ready?" },
        { title: "Guess the Word", description: "Listen closely… Can you get it right?" },
    ];

    return (
        <div className='interactive-page-wrapper'>
            <Squares
                speed={0.5}
                squareSize={40}
                direction='down'
                hoverFillColor='#F0A438'
            />
            <Header showCategoriesButton={false} showSwitchButton={true} bgColor={"transparent"} />

            <div className="interactive-page-container">
                {cardData.map((card, index) => (
                    <div onClick={() => navigate(card.nav)} className="interactive-cards" key={index}>
                        <div class="first-content">
                            <span>{card.title}</span>
                        </div>
                        <div class="second-content">
                            <span>{card.description}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InteractivePampanga;
