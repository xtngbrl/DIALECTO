import React, { useState, useRef, useEffect } from "react";
import stringSimilarity from "string-similarity";
import Meyda from "meyda";
import Swal from "sweetalert2";
import "./SpeechGame.css";
import ContentHeader from '../components/ContentHeader';
import kapilanAudio from '../sound_assets/kapilan.mp3';
import { upsertProgress } from '../services/gameprogService';

const correctWord = "kapilan";

// Waveform visualizer (from Content_Four)
const Waveform = ({ analyser }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!analyser) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dataArray = new Uint8Array(analyser.fftSize);
    let animationId;
    const draw = () => {
      analyser.getByteTimeDomainData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      // Use CSS variable for stroke color
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#4f8cff';
      ctx.beginPath();
      const sliceWidth = canvas.width / dataArray.length;
      let x = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
      animationId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animationId);
  }, [analyser]);
  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={50}
      className="speechgame-waveform"
      style={{ background: 'var(--faded-color)', borderRadius: 8, margin: '12px 0', boxShadow: '0 2px 8px rgba(79, 140, 255, 0.08)' }}
    />
  );
};

const SpeechGamePampang = () => {
  const [spokenWord, setSpokenWord] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [audioFeaturesScore, setAudioFeaturesScore] = useState(null);
  const [transcriptScore, setTranscriptScore] = useState(null);
  const [finalScore, setFinalScore] = useState(null);
  const [showProcessBtn, setShowProcessBtn] = useState(false);
  const [analyser, setAnalyser] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);

  // Play the correct word using TTS
  const speakWord = (word) => {
    const synth = window.speechSynthesis;
    const utter = new window.SpeechSynthesisUtterance(word);
    utter.lang = "fil-PH";
    synth.speak(utter);
  };

  // Play the reference audio file
  const playReferenceAudio = () => {
    const audio = new Audio(kapilanAudio);
    audio.play();
  };

  // Start recording user's voice (with Swal warning)
  const startRecording = async () => {
    const result = await Swal.fire({
      title: 'Ready to Record?',
      text: 'Make sure you are in a quiet environment and speak clearly. Use a good microphone if possible.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Start Recording',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#4f8cff',
      cancelButtonColor: '#6c757d'
    });
    if (!result.isConfirmed) return;
    setFeedback("");
    setIsRecording(true);
    setRecordedAudioUrl(null);
    setAudioFeaturesScore(null);
    setTranscriptScore(null);
    setFinalScore(null);
    setShowProcessBtn(false);
    audioChunksRef.current = [];
    setSpokenWord("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
      let audioCtx = audioContext;
      if (!audioCtx || audioCtx.state === 'closed') {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(audioCtx);
      }
      if (audioCtx.state === 'suspended') await audioCtx.resume();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 1024;
      source.connect(analyserNode);
      setAnalyser(analyserNode);
      // Live SpeechRecognition for transcript
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      let recognition;
      if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = "fil-PH";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.onresult = (event) => {
          const result = event.results[0][0];
          setSpokenWord(result.transcript.toLowerCase());
        };
        recognition.onerror = (event) => {
          setFeedback(`❌ Speech recognition error: ${event.error}`);
        };
        recognitionRef.current = recognition;
        recognition.start();
      }
      // MediaRecorder for audio
      const mediaRecorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorder.onstop = async () => {
        if (recognitionRef.current) recognitionRef.current.stop();
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setRecordedAudioUrl(URL.createObjectURL(blob));
        setShowProcessBtn(true);
        setIsRecording(false);
        setAnalyser(null);
        if (mediaStream) mediaStream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
    } catch (err) {
      setFeedback("❌ Could not start recording: " + err.message);
      setIsRecording(false);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Process both audio features and transcript from the same recording
  const processRecording = async () => {
  if (!recordedAudioUrl) return;
  setFeedback("Analyzing audio features and transcript...");
  setAudioFeaturesScore(null);
  setTranscriptScore(null);
  setFinalScore(null);
  let audioScore = null;
  let transcriptSim = null;
  let transcriptText = spokenWord;
  try {
  console.log("[SpeechGamePampang] Starting audio feature analysis...");
  // --- Audio Feature Analysis (Meyda) ---
  const response = await fetch(recordedAudioUrl);
  const userArrayBuffer = await response.arrayBuffer();
  const userAudioBuffer = await audioContext.decodeAudioData(userArrayBuffer);
  const userMFCC = await extractMFCC(userAudioBuffer);
  console.log("[SpeechGamePampang] User MFCC:", userMFCC);
  // Load and decode reference audio
  const refAudio = await fetch(kapilanAudio);
  const refArrayBuffer = await refAudio.arrayBuffer();
  const refAudioBuffer = await audioContext.decodeAudioData(refArrayBuffer);
  const refMFCC = await extractMFCC(refAudioBuffer);
  console.log("[SpeechGamePampang] Reference MFCC:", refMFCC);
  // Compare
  let distance = euclideanDistance(userMFCC, refMFCC);
  console.log(`[SpeechGamePampang] Euclidean distance between user and reference MFCC: ${distance}`);
  const maxDist = 250;
  // Robust normalization: if distance is NaN or too high, give a low but nonzero score
  if (!isFinite(distance) || distance > maxDist * 2) {
  audioScore = 0.1; // Minimum score for valid input
  console.log(`[SpeechGamePampang] Distance not finite or too high, setting audioScore to 0.1`);
  } else {
  audioScore = Math.max(0.1, 1 - distance / maxDist); // Never return below 10% for valid MFCCs
  audioScore = Math.min(audioScore, 1);
  console.log(`[SpeechGamePampang] Normalized audio score (min 0.1): ${audioScore}`);
  }
  setAudioFeaturesScore(audioScore);
  // --- Transcript Analysis (string-similarity) ---
  transcriptSim = stringSimilarity.compareTwoStrings(transcriptText, correctWord);
  console.log(`[SpeechGamePampang] Transcript similarity score: ${transcriptSim}`);
  setTranscriptScore(transcriptSim);
  // Combine scores
  const final = (transcriptSim + audioScore) / 2;
  console.log(`[SpeechGamePampang] Final combined score: ${final}`);
  setFinalScore(final);
  setFeedback(
  `Combined Score: ${(final * 100).toFixed(1)}%\n` +
  `Transcript: ${(transcriptSim * 100).toFixed(1)}%\n` +
  `Audio: ${(audioScore * 100).toFixed(1)}%\n` +
  `You said: ${transcriptText}`
  );
  
    const numericScore = Math.round(final * 100);
    const roundedTranscriptScore = Math.round(transcriptSim * 100);
    const finalScoreToSubmit = transcriptSim === 0 ? 0 : numericScore;
  
    await upsertProgress({
      gameType: 'match',
      dialect_id: 2,
      score: finalScoreToSubmit,
        details: {
          word: correctWord,
          transcript: transcriptText,
          transcriptScore: roundedTranscriptScore,
          audioScore: Math.round(audioScore * 100)
        }
    });
  
  } catch (err) {
  setFeedback("❌ Analysis failed: " + err.message);
  setAudioFeaturesScore(null);
  setTranscriptScore(null);
  setFinalScore(null);
  console.error("[SpeechGamePampang] Analysis failed:", err);
  await Swal.fire({
  icon: 'error',
  title: 'Analysis Failed',
  text: err.message,
  confirmButtonText: 'OK',
  confirmButtonColor: '#4f8cff',
  });
  }
  };

  // Extract MFCC features using Meyda from an audio buffer
  const extractMFCC = async (audioBuffer) => {
    const mfccs = [];
    const channelData = audioBuffer.getChannelData(0);
    const frameSize = 512;
    for (let i = 0; i < channelData.length - frameSize; i += frameSize) {
      const frame = channelData.slice(i, i + frameSize);
      const features = Meyda.extract("mfcc", frame, {
        sampleRate: audioBuffer.sampleRate,
        bufferSize: frameSize,
        numberOfMFCCCoefficients: 13,
      });
      if (features && features.mfcc) mfccs.push(features.mfcc);
    }
    console.log(`[SpeechGamePampang] Extracted ${mfccs.length} MFCC frames.`);
    if (mfccs.length === 0) {
      console.log("[SpeechGamePampang] No MFCC frames extracted.");
      return null;
    }
    const avg = Array(mfccs[0].length).fill(0);
    mfccs.forEach((mfcc) => {
      mfcc.forEach((val, idx) => {
        avg[idx] += val;
      });
    });
    const avgMFCC = avg.map((val) => val / mfccs.length);
    console.log("[SpeechGamePampang] Averaged MFCC:", avgMFCC);
    return avgMFCC;
  };

  // Calculate Euclidean distance between two MFCC vectors
  const euclideanDistance = (a, b) => {
    if (!a || !b || a.length !== b.length) {
      console.log("[SpeechGamePampang] Invalid MFCC vectors for distance calculation.", a, b);
      return 9999;
    }
    const dist = Math.sqrt(a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0));
    console.log(`[SpeechGamePampang] Calculated Euclidean distance: ${dist}`);
    return dist;
  };

  useEffect(() => {
    return () => {
      if (mediaStream) mediaStream.getTracks().forEach(track => track.stop());
      if (audioContext && audioContext.state !== 'closed') audioContext.close();
    };
  }, [mediaStream, audioContext]);

  return (
    <>
    <ContentHeader />
    <div className="speechgame-wrapper">
      <h2>🎤 Speak the Word!</h2>
      <p>
        Say this word: <strong>{correctWord}</strong> Translated as: <strong>Kailan</strong>
      </p>
      <div className="speechgame-btns">
        {/* <button onClick={() => speakWord(correctWord)} disabled={isRecording}>
          🔊 Play Word (TTS)
        </button> */}
        <button onClick={playReferenceAudio} disabled={isRecording}>
          🎧 Play Reference Audio
        </button>
      </div>
      <div className="speechgame-btns">
        <button onClick={startRecording} disabled={isRecording}>
          {isRecording ? "⏺️ Recording..." : "🎙️ Record Voice"}
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          ⏹️ Stop Recording
        </button>
      </div>
      {isRecording && (
        <div style={{ marginTop: 12 }}>
          <div style={{ color: '#4f8cff', fontWeight: 600 }}>Recording...</div>
          <Waveform analyser={analyser} />
        </div>
      )}
      {recordedAudioUrl && !isRecording && (
        <div className="speechgame-audio-preview">
          <audio controls src={recordedAudioUrl} className="speechgame-audio-controls" />
        </div>
      )}
      {showProcessBtn && !isRecording && (
        <div style={{ margin: '1rem 0' }}>
          <button className="process-voice-btn" onClick={processRecording}>
            Process Voice
          </button>
        </div>
      )}
      <div className="speechgame-results">
        {finalScore !== null && (
          <>
            <div className="accuracy-percentage">{(finalScore * 100).toFixed(1)}%</div>
            <div className="accuracy-bar-outer">
              <div
                className="accuracy-bar-inner"
                style={{ width: `${(finalScore * 100).toFixed(1)}%` }}
              ></div>
            </div>
          </>
        )}
        <p>
          <strong>You said:</strong> {spokenWord || "-"}
        </p>
        <p>
          <strong>Feedback:</strong>
          <pre className="speechgame-feedback">{feedback || "-"}</pre>
        </p>
      </div>
    </div>
    </>
  );
};

export default SpeechGamePampang;
