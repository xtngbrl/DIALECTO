import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileOne from '../assets/p1.png';
import ProfileTwo from '../assets/p2.png';
import ProfileThree from '../assets/p3.png';
import ProfileFour from '../assets/p4.png'
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
// import { getLeaderboard } from '../services/leaderboardSevice';


const array = [
  {profile: ProfileOne ,name: "Player 1", progress: "597 Points" },
  {profile: ProfileTwo ,name: "Player 2", progress: "595 Points" },
  {profile: ProfileThree ,name: "Player 3", progress: "587 Points" },
  {profile: ProfileFour ,name: "Player 4", progress: "531 Points" },
  {profile: ProfileFive ,name: "Player 5", progress: "509 Points" },
  {profile: ProfileSix ,name: "Player 6", progress: "433 Points" },
  {profile: ProfileSeven ,name: "Player 7", progress: "401 Points" },
  {profile: ProfileEight ,name: "Player 8", progress: "400 Points" },
  {profile: ProfileNine ,name: "Player 9", progress: "321 Points" },
  {profile: ProfileTen ,name: "Player 10", progress: "198 Points" },

]

// const profileImages = [
//   ProfileOne, ProfileTwo, ProfileThree, ProfileFour,
//   ProfileFive, ProfileSix, ProfileSeven, ProfileEight,
//   ProfileNine, ProfileTen
// ];

// const getRandomProfile = () => {
//   const randomIndex = Math.floor(Math.random() * profileImages.length);
//   return profileImages[randomIndex];
// };

const LeaderBoard = () => {
  const navigate = useNavigate();
  // const [leaderboard, setLeaderboard] = useState([]);

  // useEffect(() => {
  //   const fetchLeaderboard = async () => {
  //     try {
  //       const data = await getLeaderboard("quiz"); 
  //       setLeaderboard(data);
  //     } catch (error) {
  //       console.error("Failed to load leaderboard:", error);
  //     }
  //   };
  //   fetchLeaderboard();
  // }, []);

  // const topThree = leaderboard.slice(0, 3);
  // const others = leaderboard.slice(3);

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
          {/* {topThree[1] && (
            <div className='player player2'>
              <span className="rank-number">2</span>
              <img src={getRandomProfile()} />
              <img src={TrophyTwo} />
              <h4>{topThree[1].user?.first_name} {topThree[1].user?.last_name}</h4>
            </div>
          )}
          {topThree[0] && (
            <div className='player player1'>
              <span className="rank-number">1</span>
              <img src={getRandomProfile()} />
              <img src={TrophyOne} />
              <h4>{topThree[0].user?.first_name} {topThree[0].user?.last_name}</h4>
            </div>
          )}
          {topThree[2] && (
            <div className='player player3'>
              <span className="rank-number">3</span>
              <img src={getRandomProfile()} />
              <img src={TrophyThree} />
              <h4>{topThree[2].user?.first_name} {topThree[2].user?.last_name}</h4>
            </div>
          )} */}
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
          {/* {others.map((entry, index) => (
            <div className='player-list' key={entry.id || index}>
              <div className='player-names'>
                <span className="rank-number">{index + 4}</span>
                <img src={getRandomProfile()} />
                <h4>{entry.user?.first_name} {entry.user?.last_name}</h4>
              </div>
              <h4>{entry.total_score}</h4>
            </div>
          ))} */}

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
  );
};

export default LeaderBoard;
