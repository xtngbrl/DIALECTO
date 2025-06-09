import React, { useState } from "react";
import stringSimilarity from "string-similarity";
import "./Content.css"; // make sure mic and idle classes are defined here

const SpeechGame = () => {
  const [spokenWord, setSpokenWord] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isListening, setIsListening] = useState(false);
  const correctWord = "ubos";

  const speakWord = (word) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = "fil-PH";
    synth.speak(utter);
  };

  const handleListen = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fil-PH";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    setFeedback("🎙️ Listening...");

    recognition.start();

    recognition.onresult = (event) => {
      setIsListening(false);
      const result = event.results[0][0];
      console.log(event.results[0][0]);
      const transcript = result.transcript.toLowerCase();
      const confidence = (result.confidence * 100).toFixed(2);
      console.log(result.transcript); 
      console.log(result.confidence); 
      setSpokenWord(transcript);

      const similarity = stringSimilarity.compareTwoStrings(
        transcript,
        correctWord
      );
      const accuracy = (similarity * 100).toFixed(2);

      if (similarity > 0.9) {
        setFeedback(
          `✅ Perfect! You said "${transcript}" (Similarity: ${accuracy}%, Confidence: ${confidence}%)`
        );
      } else if (similarity > 0.7) {
        setFeedback(
          `✨ Almost! You said "${transcript}" (Similarity: ${accuracy}%, Confidence: ${confidence}%)`
        );
      } else {
        setFeedback(
          `❌ Try again. You said "${transcript}" (Similarity: ${accuracy}%, Confidence: ${confidence}%)`
        );
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      setFeedback("❌ There was an error. Please try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>🎤 Speak the Word!</h2>
      <p>
        Say this word: <strong>{correctWord}</strong>
      </p>

      <div className={`mic ${isListening ? "" : "idle"}`}></div>

      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => speakWord(correctWord)}
          disabled={isListening}
          style={{ marginRight: "10px" }}
        >
          🔊 Play Word
        </button>

        <button
          onClick={handleListen}
          disabled={isListening}
          style={{
            backgroundColor: isListening ? "#ccc" : "#007bff",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: isListening ? "not-allowed" : "pointer",
          }}
        >
          {isListening ? "🎙️ Listening..." : "🎙️ Start Speaking"}
        </button>
      </div>

      <p>
        <strong>You said:</strong> {spokenWord || "-"}
      </p>
      <p>
        <strong>Feedback:</strong> {feedback || "-"}
      </p>
    </div>
  );
};

export default SpeechGame;
