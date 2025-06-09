import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiSpeakerWave } from "react-icons/hi2";
import { FaMicrophone } from "react-icons/fa6";
import Swal from 'sweetalert2';
import ayamAudio from '../sound_assets/Animal/Aso_Ayam/ASO-AYAM.mp3';
import ContentHeader from '../components/ContentHeader';
import ContentButton from '../components/shared/ContentBtn';
import RecordPopup from '../components/RecPopUp';
import ResultPopUp from '../components/ResultPop';
import './Content.css';

import { 
    loadAudioBuffer,    // Loads and decodes audio files into AudioBuffer 
    extractMFCC,        // Extracts MFCC features from AudioBuffer
    euclideanDistance   // Calculates similarity between feature vectors
} from '../utils/voiceMatching';

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

const MATCH_THRESHOLD = 120;
const MAX_DISTANCE = 250;

const ContentFour = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showResultPopup, setShowResultPopup] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [recordedAudioBuffer, setRecordedAudioBuffer] = useState(null);
    const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
    const [mediaStream, setMediaStream] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [analyser, setAnalyser] = useState(null);
    const [accuracy, setAccuracy] = useState(null);
    const [isMatch, setIsMatch] = useState(null);
    const [audioContext, setAudioContext] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem('hasSeenPopup');
        if (!hasSeenPopup) setShowPopup(true);
    }, []);

    useEffect(() => {
        return () => {
            if (mediaStream) mediaStream.getTracks().forEach(track => track.stop());
            if (recordedAudioUrl) URL.revokeObjectURL(recordedAudioUrl);
            if (audioContext && audioContext.state !== 'closed') audioContext.close();
        };
    }, [mediaStream, recordedAudioUrl, audioContext]);

    const handlePlaySound = () => {
        const audio = new Audio(ayamAudio);
        audio.play();
    };

    const handleRecordClick = async () => {
        setAccuracy(null);
        setRecordedAudioBuffer(null);
        setAudioChunks([]);
        setIsMatch(null);
        if (recordedAudioUrl) {
            URL.revokeObjectURL(recordedAudioUrl);
            setRecordedAudioUrl(null);
        }

        const result = await Swal.fire({
            title: 'Ready to Record?',
            text: 'Make sure you are in a quiet environment and speak clearly.',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Start Recording',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#4f8cff',
            cancelButtonColor: '#6c757d'
        });

        if (!result.isConfirmed) return;

        setIsRecording(true);

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

            const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/webm';
            const recorder = new MediaRecorder(stream, { mimeType });
            setMediaRecorder(recorder);

            const chunks = [];
            recorder.ondataavailable = e => e.data.size > 0 && chunks.push(e.data);

            recorder.onstop = async () => {
                const blob = new Blob(chunks, { type: mimeType });
                const arrayBuffer = await blob.arrayBuffer();
                const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
                setRecordedAudioBuffer(audioBuffer);
                setRecordedAudioUrl(URL.createObjectURL(blob));
                setAudioChunks(chunks);
                setIsRecording(false);
                setAnalyser(null);
                stream.getTracks().forEach(track => track.stop());
            };

            recorder.start(100);
        } catch (err) {
            console.error('Recording setup error:', err);
            Swal.fire({
                title: 'Recording Error!',
                text: `Could not start recording: ${err.message}`,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#4f8cff'
            });
            setIsRecording(false);
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
            Swal.fire({
                title: 'Processing Recording...',
                text: 'Please wait while we process your audio.',
                icon: 'info',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        }
    };

    const handleResultClick = async () => {
        if (!recordedAudioBuffer) {
            Swal.fire({
                title: 'No Recording!',
                text: 'Please record your voice first!',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#4f8cff'
            });
            return;
        }

        setIsProcessing(true);

        try {
            // ✅ UTILS USAGE #1: Load reference audio file
            // loadAudioBuffer() loads the MP3 file and converts it to AudioBuffer
            const refBuffer = await loadAudioBuffer(ayamAudio);
            
            // ✅ UTILS USAGE #2: Extract MFCC features from recorded audio
            // extractMFCC() processes the AudioBuffer and returns feature vector
            const userMFCC = extractMFCC(recordedAudioBuffer);
            
            // ✅ UTILS USAGE #3: Extract MFCC features from reference audio
            // Same function, different input - extracts features from reference
            const refMFCC = extractMFCC(refBuffer);

            // ✅ UTILS USAGE #4: Calculate similarity between voices
            // euclideanDistance() compares the two feature vectors
            // Lower distance = more similar voices
            let distance = euclideanDistance(userMFCC, refMFCC);
            
            // Handle edge cases
            if (!isFinite(distance)) distance = MAX_DISTANCE;
            
            // Convert distance to percentage (0-100%)
            let percent = Math.max(0, 100 - (distance / MAX_DISTANCE) * 100);
            percent = Math.min(percent, 100);

            setAccuracy(Math.round(percent * 100) / 100);
            setIsMatch(distance < MATCH_THRESHOLD);

            Swal.fire({
                icon: 'success',
                title: `Analysis complete! Accuracy: ${Math.round(percent)}%`,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (err) {
            console.error('Voice matching error:', err);
            setAccuracy(0);
            setIsMatch(false);
            Swal.fire({
                title: 'Voice Matching Failed!',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#4f8cff'
            });
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
        if (recordedAudioUrl) URL.revokeObjectURL(recordedAudioUrl);
        setRecordedAudioUrl(null);
    };

    return (
        <div className='content-one-wrapper four-wrapper'>
            {showPopup && <RecordPopup onExit={() => {
                setShowPopup(false);
                localStorage.setItem('hasSeenPopup', 'true');
            }} />}
            {showResultPopup && <ResultPopUp onExit={handleExitResult} accuracy={accuracy} isMatch={isMatch} />}
            <ContentHeader showAttentionIcon onAttentionIconClick={() => setShowPopup(true)} />

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
                        <ContentButton label={isRecording ? 'Recording...' : 'Record'} onClick={handleRecordClick} disabled={isRecording || isProcessing} />
                        <ContentButton label='Stop' onClick={handleStopRecording} disabled={!isRecording} />
                        <ContentButton label={isProcessing ? 'Processing...' : 'Submit'} onClick={handleResultClick} disabled={isProcessing || !recordedAudioBuffer} />
                    </div>

                    {isRecording && <div style={{ marginTop: 12 }}>
                        <div style={{ color: '#4f8cff', fontWeight: 600 }}>Recording...</div>
                        <Waveform analyser={analyser} />
                    </div>}

                    {recordedAudioBuffer && !isRecording && (
                        <div style={{ marginTop: 12, color: '#28a745', fontSize: 14 }}>
                            ✓ Recording ready ({recordedAudioBuffer.duration.toFixed(1)}s)
                        </div>
                    )}

                    {recordedAudioUrl && !isRecording && (
                        <audio controls style={{ marginTop: 8 }}>
                            <source src={recordedAudioUrl} type='audio/webm' />
                            Your browser does not support the audio element.
                        </audio>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContentFour;