import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiSpeakerWave } from "react-icons/hi2";
import { FaMicrophone } from "react-icons/fa6";
import ayamAudio from '../sound_assets/Animal/Aso_Ayam/ASO-AYAM.mp3';
// import halasAudio from '../sound_assets/Animal/Ahas_Halas/halas1.mp3';
import ContentHeader from '../components/ContentHeader';
import ContentButton from '../components/shared/ContentBtn';
import RecordPopup from '../components/RecPopUp';
import ResultPopUp from '../components/ResultPop';
import './Content.css';
import { loadAudioBuffer, extractMFCC, euclideanDistance } from '../utils/voiceMatching';

// --- Waveform visualization component ---
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
            ctx.strokeStyle = '#4f8cff';
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
            width={300}
            height={60}
            style={{ background: '#e6f0ff', borderRadius: 8, margin: '12px 0' }}
        />
    );
};

const MATCH_THRESHOLD = 120; // Tune as needed
const MAX_DISTANCE = 250; // Maximum distance for 0% accuracy (tune as needed)

const ContentFour = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showResultPopup, setShowResultPopup] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [recordedAudioBuffer, setRecordedAudioBuffer] = useState(null);
    const [recordedAudioUrl, setRecordedAudioUrl] = useState(null); // For playback
    const [mediaStream, setMediaStream] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [analyser, setAnalyser] = useState(null);
    const [accuracy, setAccuracy] = useState(null);
    const [isMatch, setIsMatch] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem('hasSeenPopup');
        if (!hasSeenPopup) {
            setShowPopup(true);
        }
    }, []);

    // Clean up media stream and audio URL on unmount
    useEffect(() => {
        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
            if (recordedAudioUrl) {
                URL.revokeObjectURL(recordedAudioUrl);
            }
        };
    }, [mediaStream, recordedAudioUrl]);

    const handlePlaySound = () => {
        const audio = new Audio(ayamAudio);
        audio.play();
    };

    const handleAttentionIconClick = () => {
        setShowPopup(true);
    };

    const onExit = () => {
        setShowPopup(false);
        localStorage.setItem('hasSeenPopup', 'true');
    };

    // --- Recording logic ---
    const handleRecordClick = async () => {
        setAccuracy(null);
        setRecordedAudioBuffer(null);
        setAudioChunks([]);
        setIsMatch(null);
        if (recordedAudioUrl) {
            URL.revokeObjectURL(recordedAudioUrl);
            setRecordedAudioUrl(null);
        }
        setIsRecording(true);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setMediaStream(stream);

            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioCtx.createMediaStreamSource(stream);
            const analyserNode = audioCtx.createAnalyser();
            analyserNode.fftSize = 1024;
            source.connect(analyserNode);
            setAnalyser(analyserNode);

            const recorder = new window.MediaRecorder(stream);
            setMediaRecorder(recorder);

            let chunks = [];
            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };
            recorder.onstop = async () => {
                // Convert chunks to AudioBuffer
                const blob = new Blob(chunks, { type: "audio/webm" });
                const arrayBuffer = await blob.arrayBuffer();
                const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
                setRecordedAudioBuffer(audioBuffer);
                setAudioChunks(chunks);
                // For playback
                const url = URL.createObjectURL(blob);
                setRecordedAudioUrl(url);
                setIsRecording(false);
                setAnalyser(null);
                // Stop tracks
                stream.getTracks().forEach(track => track.stop());
            };

            recorder.start();
        } catch (err) {
            setIsRecording(false);
            setAnalyser(null);
            setMediaStream(null);
            setMediaRecorder(null);
            alert('Could not start recording: ' + err.message);
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
        }
    };

    // --- Voice matching logic ---
    const handleResultClick = async () => {
        if (!recordedAudioBuffer) {
            alert("Please record your voice first!");
            return;
        }
        setIsProcessing(true);
        try {
            // Debug: check buffer length
            if (!recordedAudioBuffer.getChannelData || recordedAudioBuffer.length === 0) {
                throw new Error("Recorded audio buffer is empty or invalid.");
            }
            // 1. Use the recorded audio buffer
            const userBuffer = recordedAudioBuffer;
            console.log(userBuffer, 'ub');
            // 2. Load reference audio
            const refBuffer = await loadAudioBuffer(ayamAudio);
            console.log(refBuffer, 'rb');
            // 3. Extract MFCC features
            const userMFCC = extractMFCC(userBuffer);
            console.log('userMFCC:', userMFCC);
            const refMFCC = extractMFCC(refBuffer);
            console.log('refMFCC:', refMFCC);

            // Defensive: check MFCCs
            if (
                !Array.isArray(userMFCC) || !Array.isArray(refMFCC) ||
                userMFCC.length === 0 || refMFCC.length === 0 ||
                userMFCC.some(isNaN) || refMFCC.some(isNaN)
            ) {
                throw new Error("MFCC extraction failed or returned invalid values.");
            }

            let distance = euclideanDistance(userMFCC, refMFCC);
            console.log('calculated distance from recording to reference:', distance);

            if (!isFinite(distance) || isNaN(distance)) distance = MAX_DISTANCE;

            let percent = 100 - (distance / MAX_DISTANCE) * 100;
            if (!isFinite(percent) || isNaN(percent)) percent = 0;
            percent = Math.max(0, Math.min(percent, 100));
            setAccuracy(percent);
            setIsMatch(distance < MATCH_THRESHOLD);
        } catch (err) {
            setAccuracy(0);
            setIsMatch(false);
            console.error('Voice matching error:', err);
        } finally {
            setIsProcessing(false);
            setShowResultPopup(true);
        }
    };

    const handleExitResult = () => {
        setShowResultPopup(false);
        setAccuracy(null);
        setRecordedAudioBuffer(null);
        setIsMatch(false);
        if (recordedAudioUrl) {
            URL.revokeObjectURL(recordedAudioUrl);
            setRecordedAudioUrl(null);
        }
        // navigate(-1);
    };

    return (
        <div className='content-one-wrapper four-wrapper'>
            {showPopup && <RecordPopup onExit={onExit} />}
            {showResultPopup && (
                <ResultPopUp
                    onExit={handleExitResult}
                    accuracy={accuracy}
                    isMatch={isMatch}
                />
            )}
            <ContentHeader showAttentionIcon={true} onAttentionIconClick={handleAttentionIconClick} />
            <div></div>
            <div className='content-title four-title'>Listen and Match your Voice</div>

            <div className='content-one-container'>
                <div className='speaker-container'>
                    <HiSpeakerWave className='speaker-icon' />
                    <div className='speaker-btn'>
                        <ContentButton label='Play' onClick={handlePlaySound} />
                    </div>
                </div>

                <div className='mic-container'>
                    <FaMicrophone className='mic-icon' />
                    <div className='mic-btn'>
                        <ContentButton
                            label={isRecording ? 'Recording...' : 'Record'}
                            onClick={handleRecordClick}
                            disabled={isRecording}
                        />
                        <ContentButton
                            label='Stop'
                            onClick={handleStopRecording}
                            disabled={!isRecording}
                        />
                        <ContentButton
                            label='Submit'
                            onClick={handleResultClick}
                            disabled={isProcessing || !recordedAudioBuffer}
                        />
                    </div>
                    {isRecording && (
                        <div style={{ marginTop: 12 }}>
                            <div style={{ color: '#4f8cff', fontWeight: 600 }}>Recording...</div>
                            <Waveform analyser={analyser} />
                        </div>
                    )}
                    {/* Playback for user recording */}
                    {recordedAudioUrl && !isRecording && (
                        <div style={{ marginTop: 16, textAlign: 'center' }}>
                            <audio controls src={recordedAudioUrl} />
                            <div style={{ fontSize: 12, color: '#888' }}>Playback your recording</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContentFour;