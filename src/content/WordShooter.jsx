import React, { useRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Crosshair from "../components/Crosshair";
import { ImTarget } from "react-icons/im";
import { GiAmmoBox } from "react-icons/gi";
import "./Content.css";

import hitSoundFile from "../assets/hard-click.mp3";   
import missSoundFile from "../assets/pong.mp3"; 

import { upsertProgress } from "../services/gameprogService";

const words = [
  "halas", "yatot", "ayam", "tamsi", "ulot",
  "misay", "buwas", "balay", "purtahan", "kulop",
  "maupay", "tawo", "sangkay", "udto", "mahusay",
  "iya", "isog", "turog", "karuyag", "hain"
];

const WordShooter = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [targetWords, setTargetWords] = useState([]);
  const [hitWords, setHitWords] = useState([]);
  const [positions, setPositions] = useState([]);
  const [targetsLeft, setTargetsLeft] = useState(5);
  const [ammo, setAmmo] = useState(20);
  const [activeWords, setActiveWords] = useState(words);

  const playSound = (soundFile) => {
    const sound = new Audio(soundFile); 
    sound.currentTime = 0;
    sound.play().catch((error) => console.error("Audio play error:", error));
  };

  useEffect(() => {
    const selectedTargets = words.sort(() => 0.5 - Math.random()).slice(0, 5);
    setTargetWords(selectedTargets);

    setPositions(
      words.map(() => ({
        top: Math.random() * 500,
        left: Math.random() * 500,
        speedX: Math.random() * 1 + 0.5,
        speedY: Math.random() * 1 + 0.5,
      }))
    );

    Swal.fire({
      title: "Target Words",
      html: `<strong>${selectedTargets.join(", ")}</strong>`,
      icon: "info",
      confirmButtonText: "Start Game",
    });
  }, []);

  useEffect(() => {
    const animate = () => {
      setPositions((prevPositions) =>
        prevPositions.map((pos) => {
          let newTop = pos.top + pos.speedY;
          let newLeft = pos.left + pos.speedX;

          if (containerRef.current) {
            const { clientWidth, clientHeight } = containerRef.current;

            if (newTop <= 0 || newTop >= clientHeight - 50) pos.speedY *= -1;
            if (newLeft <= 0 || newLeft >= clientWidth - 100) pos.speedX *= -1;
          }

          return { ...pos, top: newTop, left: newLeft };
        })
      );

      setTimeout(animate, 20);
    };

    animate();
  }, []);

  const handleClick = (word) => {
    if (targetWords.includes(word)) {
      playSound(hitSoundFile); 
      setTargetsLeft((prev) => prev - 1);
      setActiveWords((prevWords) => prevWords.filter((w) => w !== word));
      setHitWords((prevHitWords) => [...prevHitWords, word]);
    } else {
      playSound(missSoundFile); 
      setAmmo((prev) => prev - 1);
    }

    checkGameStatus();
  };

  const handleMiss = () => {
    playSound(missSoundFile); 
    setAmmo((prev) => prev - 1);
    checkGameStatus();
  };

  const checkGameStatus = async () => {
    const remainingTargets = targetsLeft - 1;
    const remainingAmmo = ammo - 1;
    const score = 5 - remainingTargets;

    const details = {
      targets: targetWords,
      wordsHit: score,
      remainingAmmo,
      result: remainingTargets === 0 ? "win" : (remainingAmmo === 0 ? "lose" : "playing")
    };

    if (remainingTargets === 0 || remainingAmmo === 0) {
      await saveProgress(score, details);

      Swal.fire({
        title: remainingTargets === 0 ? "You Win!" : "Game Over!",
        text: remainingTargets === 0 ? "All target words hit!" : "Ammo ran out!",
        icon: remainingTargets === 0 ? "success" : "error",
        showCancelButton: true,
        confirmButtonText: "Play Again",
        cancelButtonText: "Exit",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else {
          navigate("/dialecto/interactive-page");
        }
      });
    }
  };

  const saveProgress = async (score, details) => {
    try {
      await upsertProgress({
        gameType: "shoot",
        score,
        details,
      });
    } catch (err) {
      console.error("Error saving game progress:", err);
    }
  };

  return (
    <div className="word-shooter-wrapper" ref={containerRef} onClick={handleMiss}>
      <Crosshair containerRef={containerRef} color="brown" />
      <div className="shooter-header">
        <ImTarget className="shooter-icon target" />
        <div className="target-counter">{targetsLeft}</div>
        <GiAmmoBox className="shooter-icon ammo" />
        <div className="ammo-counter">{ammo}</div>
        <div className="target-words">
          {targetWords.map((word, index) => (
            <span 
              key={index}
              className={hitWords.includes(word) ? "target-word hit" : "target-word"}
            >
              {word}
              {index < targetWords.length - 1 && ", "}
            </span>
          ))}
        </div>
      </div>
      <div className="word-shooter-container">
        {activeWords.map((word, index) => (
          <div
            key={index}
            className="word"
            style={{
              top: positions[index]?.top || 0,
              left: positions[index]?.left || 0,
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(word);
            }}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordShooter;
