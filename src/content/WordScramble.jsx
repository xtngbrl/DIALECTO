import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Content.css";

function WordScrambleGame() {
    const navigate = useNavigate();
    const originalText = `React Bits is a library of animated and interactive React components designed to streamline UI development and simplify your workflow.`;


    const shuffledWords = originalText.split(" ").sort(() => Math.random() - 0.5);
    const [words, setWords] = useState(shuffledWords);
    const [attempts, setAttempts] = useState(5);

    const handleDragStart = (index) => (event) => {
        event.dataTransfer.setData("wordIndex", index);
    };

    const handleDrop = (index) => (event) => {
        event.preventDefault();
        const draggedIndex = Number(event.dataTransfer.getData("wordIndex"));

        if (draggedIndex === index) return;

        const newWords = [...words];
        const draggedWord = newWords.splice(draggedIndex, 1)[0];
        newWords.splice(index, 0, draggedWord);

        setWords(newWords);
    };

    const checkAnswer = () => {
        const userSentence = words.join(" ");
        if (userSentence === originalText) {
            Swal.fire({
                title: "🎉 You've Won!",
                text: "Congratulations! You arranged the words correctly.",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Play Again",
                cancelButtonText: "Exit"
            }).then((result) => {
                if (result.isConfirmed) {
                    resetGame();
                } else {
                    navigate("/dialecto/interactive-page");
                }
            });
        } else {
            if (attempts > 1) {
                setAttempts(attempts - 1);
                Swal.fire({
                    title: "❌ Oops! Wrong Answer!",
                    text: `You have ${attempts - 1} tries remaining.`,
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonText: "Try Again",
                    cancelButtonText: "Exit"
                }).then((result) => {
                    if (!result.isConfirmed) {
                        navigate("/dialecto/interactive-page");
                    }
                });
            } else {
                Swal.fire({
                    title: "😢 Out of Tries!",
                    text: "You have used all your attempts. Try again in the future!",
                    icon: "error",
                    confirmButtonText: "Exit"
                }).then(() => navigate("/dialecto/interactive-page"));
            }
        }
    };

    const resetGame = () => {
        setWords(originalText.split(" ").sort(() => Math.random() - 0.5));
        setAttempts(5);
    };

    return (
        <div className="text-game-wrapper">
            <h2>Rearrange the Words</h2>
            <div className="word-container">
                {words.map((word, index) => (
                    <span
                        key={index}
                        draggable
                        onDragStart={handleDragStart(index)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={handleDrop(index)}
                        className="draggable-word"
                    >
                        {word}
                    </span>
                ))}
            </div>
            <div className="text-game-buttom">
                <p>Attempts Remaining: {attempts}</p>
                <button onClick={checkAnswer} className="submit-btn">Check Answer</button>
            </div>
        </div>
    );
}

export default WordScrambleGame;
