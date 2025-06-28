import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa6";
import ProgressCategCard from "../components/ProgressCard.jsx";
import { getUserProgress } from "../services/userprogService.js";
import "./page.css";

const ProgressPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState([]);
  const [selectedDialectId, setSelectedDialectId] = useState(1);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const progressData = await getUserProgress();
        console.log("User Progress:", progressData);
        setProgress(progressData);
      } catch (error) {
        console.error("Failed to fetch user progress:", error);
      }
    };
    fetchProgress();
  }, []);

  const cards = [
    {
      dialect_id: 1,
      progTitle: "Waray",
      bgColor: "#7FBCD2",
      numWord: "6",
    },
    {
      dialect_id: 2,
      progTitle: "Kapampangan",
      bgColor: "#E3CF23",
      numWord: "6",
    },
    {
      dialect_id: 3,
      progTitle: "Cebuano",
      bgColor: "#EDB7ED",
      numWord: "6",
    },
    {
      dialect_id: 4,
      progTitle: "Ilocano",
      bgColor: "tomato",
      numWord: "6",
    },
  ];

  const selectedProgress = progress.find(
    (p) => p.dialect_id === selectedDialectId
  );
  const gameProgress = selectedProgress?.game_progress_percentages || {};

  const gameList = [
    { title: "Word Shooter", key: "shoot", color: "#7FBCD2" },
    { title: "Jumble Fix", key: "jumbled", color: "#E3CF23" },
    { title: "Quiz Quest", key: "quiz", color: "#EDB7ED" },
    { title: "Voice Match", key: "match", color: "tomato" },
    { title: "Guess the word", key: "guess", color: "#6C757D" },
    { title: "Letter Hunt", key: "hunt", color: "#888888" },
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
        {cards.map((card) => {
          const cardProgress =
            progress.find((p) => p.dialect_id === card.dialect_id)
              ?.dialect_progress || 0;
          const isActive = selectedDialectId === card.dialect_id;
          return (
            <div
              key={card.dialect_id}
              onClick={() => setSelectedDialectId(card.dialect_id)}
              className={`progress-card-wrapper ${
                isActive ? "active-card" : ""
              }`}
            >
              <ProgressCategCard
                progTitle={card.progTitle}
                percentage={cardProgress}
                bgColor={card.bgColor}
                numWord={card.numWord}
                textColor={card.bgColor}
              />
            </div>
          );
        })}
      </div>

      <div className="progress-game-container">
        {gameList.map((game) => {
          const hasData = gameProgress.hasOwnProperty(game.key);
          const percentage = hasData ? gameProgress[game.key] : "N/A";
          const label = hasData
            ? `Attempted: ${percentage} times`
            : "Not Available";

          return (
            <div className="progress-game-card" key={game.key}>
              <div className="progress-content-header">
                <h3>{game.title}</h3>
                <h5 style={{ color: game.color }}>{" "}</h5>
              </div>
              <div className="progress-content-circular">
                <div
                  className="progress-content-card"
                  style={{
                    background: `conic-gradient(${game.color} ${
                      percentage * 3.6
                    }deg, rgb(225, 225, 225) 0deg)`,
                  }}
                >
                  <span className="progress-value-card">
                    {typeof percentage === "number"
                      ? `${percentage}%`
                      : percentage}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressPage;
