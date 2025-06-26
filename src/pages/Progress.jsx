import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProgressCategCard from "../components/ProgressCard.jsx";
import { FaChevronLeft } from "react-icons/fa6";
import "./page.css";

import { getCurrentUser } from "../services/userService.js";

const ProgressPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    getUser();
  }, []);

  const cards = [
    {
      progTitle: "Waray",
      progIcon: "paw",
      percentage: 75,
      bgColor: "#7FBCD2",
      numWord: "4",
    },
    {
      progTitle: "Kapampangan",
      progIcon: "library",
      percentage: 50,
      bgColor: "#E3CF23",
      numWord: "4",
    },
    {
      progTitle: "Cebuano",
      progIcon: "nutrition",
      percentage: 90,
      bgColor: "#EDB7ED",
      numWord: "4",
    },
    {
      progTitle: "Ilocano",
      progIcon: "business",
      percentage: 25,
      bgColor: "tomato",
      numWord: "4",
    },
  ];

  return (
    <div className="progress-wrapper">
      <div className="progress-header">
        <button onClick={() => navigate(-1)}>
          <FaChevronLeft />
        </button>
        <h4>Dialecto Adventure</h4>
      </div>

      <div className="progress-card-container">
        {cards.map((card) => (
          <ProgressCategCard
            progTitle={card.progTitle}
            percentage={card.percentage}
            bgColor={card.bgColor}
            numWord={card.numWord}
            textColor={card.bgColor}
          />
        ))}
      </div>

      <div className="progress-game-container">
        <div className="progress-game-card">
          <div className="progress-content-header">
            <h3>Word Shooter</h3>
            <h5 style={{ color: "#7FBCD2" }}>Attempted: 4 times</h5>
          </div>
          <div className="progress-content-circular">
            <div
              className="progress-content-card"
              style={{
                background: `conic-gradient( ${"#7FBCD2"} ${
                  25 * 3.6
                }deg, rgb(225, 225, 225) 0deg)`,
              }}
            >
              <span className="progress-value-card">25%</span>
            </div>
          </div>
        </div>
        <div className="progress-game-card">
          <div className="progress-content-header">
            <h3>Jumble Fix</h3>
            <h5 style={{ color: "#E3CF23" }}>Attempted: 4 times</h5>
          </div>
          <div className="progress-content-circular">
            <div
              className="progress-content-card"
              style={{
                background: `conic-gradient( ${"#E3CF23"} ${
                  25 * 3.6
                }deg, rgb(225, 225, 225) 0deg)`,
              }}
            >
              <span className="progress-value-card">25%</span>
            </div>
          </div>
        </div>
        <div className="progress-game-card">
          <div className="progress-content-header">
            <h3>Quiz Quest</h3>
            <h5 style={{ color: "#EDB7ED" }}>Attempted: 4 times</h5>
          </div>
          <div className="progress-content-circular">
            <div
              className="progress-content-card"
              style={{
                background: `conic-gradient( ${"#EDB7ED"} ${
                  25 * 3.6
                }deg, rgb(225, 225, 225) 0deg)`,
              }}
            >
              <span className="progress-value-card">25%</span>
            </div>
          </div>
        </div>
        <div className="progress-game-card">
          <div className="progress-content-header">
            <h3>Voice Match</h3>
            <h5 style={{ color: "tomato" }}>Attempted: 4 times</h5>
          </div>
          <div className="progress-content-circular">
            <div
              className="progress-content-card"
              style={{
                background: `conic-gradient( ${"tomato"} ${
                  25 * 3.6
                }deg, rgb(225, 225, 225) 0deg)`,
              }}
            >
              <span className="progress-value-card">25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
