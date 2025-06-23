// pages/LeaderBoard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileOne from '../assets/p1.png';
import ProfileTwo from '../assets/p2.png';
import ProfileThree from '../assets/p3.png';
import ProfileFour from '../assets/p4.png';
import ProfileFive from '../assets/p5.png';
import ProfileSix from '../assets/p6.png';
import ProfileSeven from '../assets/p7.png';
import ProfileEight from '../assets/p8.png';
import ProfileNine from '../assets/p9.png';
import ProfileTen from '../assets/p10.png';
import TrophyOne from '../assets/trophy1.png';
import TrophyTwo from '../assets/trophy2.png';
import TrophyThree from '../assets/trophy3.png';
import { FaChevronLeft } from "react-icons/fa6";
import './page.css';

import { getTotalLeaderboard } from '../services/leaderboardSevice';

const profileImages = [
  ProfileOne, ProfileTwo, ProfileThree, ProfileFour,
  ProfileFive, ProfileSix, ProfileSeven, ProfileEight,
  ProfileNine, ProfileTen
];

const getRandomProfile = () => {
  const randomIndex = Math.floor(Math.random() * profileImages.length);
  return profileImages[randomIndex];
};

const LeaderBoard = () => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getTotalLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error("Failed to load leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  const topThree = leaderboard.slice(0, 3);
  let completeTopThree = [...topThree];
  while (completeTopThree.length < 3) {
    completeTopThree.push({ user: {} });
  }

  const others = leaderboard.slice(3);

  const renderPlayerName = (entry = {}) => {
    return (entry.user?.first_name && entry.user?.last_name)
      ? `${entry.user.first_name} ${entry.user.last_name}`
      : "Waiting for player";
  };

  return (
    <div className='board-wrapper'>
      <div className='progress-header'>
        <button onClick={() => navigate(-1)}>
          <FaChevronLeft />
        </button>
        <h4>Dialecto Leaderboard</h4>
      </div>

      <div className='board-component'>
        <div className='right-board'>
          <div className='player player2'>
            <img src={getRandomProfile()} alt="Profile 2" />
            <img src={TrophyTwo} alt="Trophy 2" />
            <h4>{renderPlayerName(completeTopThree[1])}</h4>
          </div>

          <div className='player player1'>
            <img src={getRandomProfile()} alt="Profile 1" />
            <img src={TrophyOne} alt="Trophy 1" />
            <h4>{renderPlayerName(completeTopThree[0])}</h4>
          </div>

          <div className='player player3'>
            <img src={getRandomProfile()} alt="Profile 3" />
            <img src={TrophyThree} alt="Trophy 3" />
            <h4>{renderPlayerName(completeTopThree[2])}</h4>
          </div>
        </div>

        <div className='left-board'>
          {Array.from({ length: 7 }).map((_, i) => {
            const rank = i + 4; 
            const entry = leaderboard[rank - 1]; 

            return (
              <div className='player-list' key={entry?.user_id || `placeholder-${rank}`}>
                <div className='player-names'>
                  <span className="rank-number">{rank}</span>
                  <img src={getRandomProfile()} alt={`Profile ${rank}`} />
                  <h4>{renderPlayerName(entry || {})}</h4>
                </div>
                <h4>{entry?.total_score != null ? `${entry.total_score} pts` : '-'}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
