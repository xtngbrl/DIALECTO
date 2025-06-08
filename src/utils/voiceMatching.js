import Meyda from "meyda";

/**
 * Record audio from the user's microphone.
 * Returns a Promise that resolves to an AudioBuffer.
 */
export async function recordUserAudio(durationMs = 2000) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  let chunks = [];

  return new Promise((resolve, reject) => {
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      const arrayBuffer = await blob.arrayBuffer();
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      resolve(audioBuffer);
    };
    mediaRecorder.onerror = reject;
    mediaRecorder.start();
    setTimeout(() => mediaRecorder.stop(), durationMs);
  });
}

/**
 * Load an audio file and decode it into an AudioBuffer.
 */
export async function loadAudioBuffer(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return await audioCtx.decodeAudioData(arrayBuffer);
}

function toMono(audioBuffer) {
  if (audioBuffer.numberOfChannels === 1) {
    return audioBuffer.getChannelData(0);
  }
  // Average all channels
  const channels = [];
  for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
    channels.push(audioBuffer.getChannelData(i));
  }
  const mono = new Float32Array(audioBuffer.length);
  for (let i = 0; i < audioBuffer.length; i++) {
    let sum = 0;
    for (let c = 0; c < channels.length; c++) {
      sum += channels[c][i];
    }
    mono[i] = sum / channels.length;
  }
  return mono;
}

/**
 * Extract MFCC features from an AudioBuffer using Meyda.
 */
export function extractMFCC(audioBuffer, mfccCount = 13) {
  let channelData = toMono(audioBuffer);

  const sampleRate = audioBuffer.sampleRate;
  const frameSize = 256; // Must be a power of 2
  const hopSize = 128;

  // If the audio is too short, pad it to avoid Meyda errors
  if (channelData.length < frameSize) {
    const padded = new Float32Array(frameSize);
    padded.set(channelData);
    channelData = padded;
  }

  let mfccs = [];

  for (let i = 0; i <= channelData.length - frameSize; i += hopSize) {
    const frame = channelData.slice(i, i + frameSize);

    // Only process frames with the exact power-of-2 length
    if (frame.length !== frameSize) continue;

    // FIX: Removed the `bufferSize` parameter from the call.
    // Meyda infers the buffer size from the length of the `signal` (the frame).
    const features = Meyda.extract("mfcc", {
      signal: frame,
      sampleRate: sampleRate,
      mfcc: mfccCount,
    });

    if (features && features.mfcc) {
      mfccs.push(features.mfcc);
    }
  }

  // If no MFCCs were extracted (e.g., very short audio), return a zeroed array.
  if (mfccs.length === 0) {
    return Array(mfccCount).fill(0);
  }

  // If only one frame, return it directly
  if (mfccs.length === 1) {
    return mfccs[0];
  }

  // Average MFCCs across all frames
  const avgMfcc = Array(mfccCount).fill(0);
  mfccs.forEach((mfccFrame) => {
    mfccFrame.forEach((val, idx) => {
      avgMfcc[idx] += val;
    });
  });

  return avgMfcc.map((val) => val / mfccs.length);
}
/**
 * Compute Euclidean distance between two feature vectors.
 */
export function euclideanDistance(vec1, vec2) {
  if (vec1.length !== vec2.length) throw new Error("Vectors must be same length");
  return Math.sqrt(vec1.reduce((sum, val, i) => sum + (val - vec2[i]) ** 2, 0));
}