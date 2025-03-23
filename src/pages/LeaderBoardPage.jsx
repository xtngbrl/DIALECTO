import React from 'react'
import { useNavigate } from 'react-router-dom';
import ProfileOne from '../assets/p1.png';
import ProfileTwo from '../assets/p2.png';
import ProfileThree from '../assets/p3.png';
import ProfileFour from '../assets/p4.png'
import TrophyOne from '../assets/trophy1.png';
import TrophyTwo from '../assets/trophy2.png';
import TrophyThree from '../assets/trophy3.png';
import './page.css';
import { FaChevronLeft } from "react-icons/fa6";

const array = [
  {profile: ProfileFour ,name: "Player name 1", progress: "40%" },
  {profile: ProfileFour ,name: "Player name 1", progress: "40%" },
  {profile: ProfileFour ,name: "Player name 1", progress: "40%" },
  {profile: ProfileFour ,name: "Player name 1", progress: "40%" },
  {profile: ProfileFour ,name: "Player name 1", progress: "40%" },
  {profile: ProfileFour ,name: "Player name 1", progress: "40%" },
  {profile: ProfileFour ,name: "Player name 1", progress: "40%" },
  {profile: ProfileFour ,name: "Player name 1", progress: "40%" },
  {profile: ProfileFour ,name: "Player name 1", progress: "40%" },
  {profile: ProfileFour ,name: "Player name 1", progress: "40%" },
  {profile: ProfileFour ,name: "Player name 1", progress: "40%" },
  
]

const LeaderBoard = () => {
  const navigate = useNavigate();
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
            <img src={ProfileTwo} />
            <img src={TrophyTwo} />
            <h4>Player 2</h4>
          </div>
          <div className='player player1'>
            <img src={ProfileOne} />
            <img src={TrophyOne} />
            <h4>Player 1</h4>
          </div>
          <div className='player player3'>
            <img src={ProfileThree} />
            <img src={TrophyThree} />
            <h4>Player 3</h4>
          </div>
        </div>
        <div className='left-board'>
          {array.map((item, index) =>
            <div className='player-list' key={index}> 
            <div className='player-names'>
              <img src={item.profile} />
              <h4>{item.name}</h4>
            </div>
            <h4>{item.progress}</h4>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LeaderBoard