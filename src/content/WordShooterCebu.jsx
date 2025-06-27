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
  
const wordMap = {
  Gugma: "Pag-ibig",
  Mapait: "Pait",
  Dagan: "Takbo",
  Udto: "Tanghali",
  Buntag: "Umaga",
  Gabii: "Gabi",
  Lamia: "Masarap",
  Parat: "Maalat",
  Tagpila: "Magkano",
  Pabalyo: "Pabili",
  Pila: "Ilan",
  Tabang: "Tulong",
  Unya: "Mamaya",
  Asa: "Saan",
  Nindot: "Maganda",
  Kanusa: "Kailan",
  Kinahanglan: "Kailangan",
  Maaram: "Marunong",
  Masubo: "Malungkot",
};

const words = Object.keys(wordMap);

const WordShooterCebu = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [targetWords, setTargetWords] = useState([]);
  const [hitWords, setHitWords] = useState([]);
  const [positions, setPositions] = useState([]);
  const [targetsLeft, setTargetsLeft] = useState(5);
  const [ammo, setAmmo] = useState(20);
  const [activeWords, setActiveWords] = useState(words);

  const [showTranslationModal, setShowTranslationModal] = useState(false);
  const [translationsToShow, setTranslationsToShow] = useState([]);

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
      result: remainingTargets === 0 ? "win" : remainingAmmo === 0 ? "lose" : "playing",
    };

    if (remainingTargets === 0) {
      await saveProgress(score, details);

      const hitTranslations = hitWords.map((word) => ({
        word,
        translation: wordMap[word] || "—",
      }));

      setTranslationsToShow(hitTranslations);
      setShowTranslationModal(true);
    } else if (remainingAmmo === 0) {
      await saveProgress(score, details);

      Swal.fire({
        title: "Game Over!",
        text: "Ammo ran out!",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Play Again",
        cancelButtonText: "Exit",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else {
          navigate("/dialecto/interactive-cebu");
        }
      });
    }
  };

  const handleAfterModal = () => {
    setShowTranslationModal(false);

    Swal.fire({
      title: "You Win!",
      text: "All target words hit!",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Play Again",
      cancelButtonText: "Exit",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      } else {
        navigate("/dialecto/interactive-cebu");
      }
    });
  };

  const saveProgress = async (score, details) => {
    try {
      await upsertProgress({
        gameType: "shoot",
        dialect_id: 3,
        score: score * 10,
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

      {/* ✅ Translations Modal (only on win) */}
      {showTranslationModal && (
        <div className="translation-modal-overlay">
          <div className="translation-modal">
            <h2>Translations of Hit Words</h2>
            <ul>
              {translationsToShow.map((pair, index) => (
                <li key={index}>
                  <strong>{pair.word}</strong> → {pair.translation}
                </li>
              ))}
            </ul>
            <button onClick={handleAfterModal}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordShooterCebu;
