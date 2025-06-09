import Meyda from "meyda";

/**
 * Record audio from the user's microphone.
 * Returns a Promise that resolves to an AudioBuffer.
 */
export async function recordUserAudio(durationMs = 2000) {
  let stream = null;
  let audioCtx = null;
  
  try {
    stream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        sampleRate: 44100,
        channelCount: 1,
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      }
    });
    
    // Check for supported MIME types
    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
      ? 'audio/webm;codecs=opus' 
      : MediaRecorder.isTypeSupported('audio/mp4') 
      ? 'audio/mp4' 
      : 'audio/webm';
    
    const mediaRecorder = new MediaRecorder(stream, { mimeType });
    let chunks = [];

    return new Promise((resolve, reject) => {
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
          console.log('Audio chunk recorded:', e.data.size, 'bytes');
        }
      };
      
      mediaRecorder.onstop = async () => {
        try {
          console.log('Processing recorded chunks...');
          const blob = new Blob(chunks, { type: mimeType });
          
          if (blob.size === 0) {
            throw new Error('No audio data recorded');
          }
          
          console.log('Blob created:', blob.size, 'bytes');
          const arrayBuffer = await blob.arrayBuffer();
          
          audioCtx = new (window.AudioContext || window.webkitAudioContext)({ 
            sampleRate: 44100 
          });
          
          if (audioCtx.state === 'suspended') {
            await audioCtx.resume();
          }
          
          const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
          console.log('AudioBuffer created successfully:', {
            duration: audioBuffer.duration,
            sampleRate: audioBuffer.sampleRate,
            channels: audioBuffer.numberOfChannels,
            length: audioBuffer.length
          });
          
          resolve(audioBuffer);
        } catch (error) {
          console.error('Error processing recorded audio:', error);
          reject(error);
        } finally {
          // Clean up resources
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
          }
          if (audioCtx && audioCtx.state !== 'closed') {
            try {
              await audioCtx.close();
            } catch (e) {
              console.warn('Error closing audio context:', e);
            }
          }
        }
      };
      
      mediaRecorder.onerror = (error) => {
        console.error('MediaRecorder error:', error);
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        reject(error);
      };
      
      mediaRecorder.start(100); // Record in 100ms chunks
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, durationMs);
    });
  } catch (error) {
    console.error('Error setting up recording:', error);
    // Clean up on error
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (audioCtx && audioCtx.state !== 'closed') {
      try {
        await audioCtx.close();
      } catch (e) {
        console.warn('Error closing audio context on error:', e);
      }
    }
    throw error;
  }
}

/**
 * Load an audio file and decode it into an AudioBuffer.
 */
export async function loadAudioBuffer(url) {
  let audioCtx = null;
  
  try {
    console.log('Loading audio from URL:', url);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.status} ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    console.log('Audio file loaded:', arrayBuffer.byteLength, 'bytes');
    
    audioCtx = new (window.AudioContext || window.webkitAudioContext)({ 
      sampleRate: 44100 
    });
    
    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }
    
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    console.log('Reference AudioBuffer created:', {
      duration: audioBuffer.duration,
      sampleRate: audioBuffer.sampleRate,
      channels: audioBuffer.numberOfChannels,
      length: audioBuffer.length
    });
    
    return audioBuffer;
  } catch (error) {
    console.error('Error loading audio buffer:', error);
    throw error;
  } finally {
    // Clean up audio context
    if (audioCtx && audioCtx.state !== 'closed') {
      try {
        await audioCtx.close();
      } catch (e) {
        console.warn('Error closing audio context:', e);
      }
    }
  }
}

/**
 * Convert multi-channel audio to mono by averaging channels
 */
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
  
  console.log('Converted to mono:', mono.length, 'samples');
  return mono;
}

/**
 * Normalize audio data to prevent clipping and improve consistency
 */
function normalizeAudio(audioData) {
  const dataLength = audioData.length;
  
  // Find max value without using spread operator to avoid stack overflow
  let maxValue = 0;
  for (let i = 0; i < dataLength; i++) {
    const absValue = Math.abs(audioData[i]);
    if (absValue > maxValue) {
      maxValue = absValue;
    }
  }
  
  if (maxValue === 0 || !isFinite(maxValue)) {
    console.warn('Audio normalization: max value is 0 or invalid, returning original data');
    // Return as Float32Array for consistency
    return audioData instanceof Float32Array ? audioData : new Float32Array(audioData);
  }
  
  // Normalize to Float32Array
  const normalized = new Float32Array(dataLength);
  for (let i = 0; i < dataLength; i++) {
    normalized[i] = audioData[i] / maxValue;
  }
  
  console.log('Audio normalized, max value was:', maxValue);
  return normalized;
}

/**
 * Ensure buffer size is a power of 2 for Meyda compatibility
 */
function getValidBufferSize(desiredSize) {
  const powerOf2Sizes = [64, 128, 256, 512, 1024, 2048, 4096, 8192];
  
  // Find the closest power of 2 that's >= desiredSize
  for (let size of powerOf2Sizes) {
    if (size >= desiredSize) {
      return size;
    }
  }
  
  // If desiredSize is larger than our max, return the largest
  return powerOf2Sizes[powerOf2Sizes.length - 1];
}

/**
 * Extract MFCC features from an AudioBuffer using Meyda.
 */
export function extractMFCC(audioBuffer, mfccCount = 13) {
  try {
    console.log('Starting MFCC extraction...');
    
    // Validate input
    if (!audioBuffer || typeof audioBuffer.getChannelData !== 'function') {
      throw new Error('Invalid audio buffer provided');
    }
    
    if (audioBuffer.length === 0) {
      throw new Error('Audio buffer is empty');
    }
    
    if (audioBuffer.duration < 0.01) {
      console.warn('Audio is very short:', audioBuffer.duration, 'seconds');
    }
    
    // Convert to mono and normalize
    let channelData = toMono(audioBuffer);
    channelData = normalizeAudio(channelData);
    
    const sampleRate = audioBuffer.sampleRate;
    
    // Use power of 2 buffer sizes that Meyda requires
    const desiredFrameSize = 1024;
    const frameSize = getValidBufferSize(desiredFrameSize);
    const hopSize = Math.floor(frameSize / 2); // 50% overlap
    
    console.log('MFCC extraction parameters:', {
      sampleRate,
      frameSize,
      hopSize,
      audioLength: channelData.length,
      duration: audioBuffer.duration
    });
    
    // Ensure we have enough data
    if (channelData.length < frameSize) {
      console.log('Padding short audio from', channelData.length, 'to', frameSize);
      const padded = new Float32Array(frameSize);
      padded.set(channelData);
      // Fill remaining with zeros (already initialized)
      channelData = padded;
    }
    
    let mfccs = [];
    let frameCount = 0;
    let processedFrames = 0;
    
    // Initialize Meyda with the correct buffer size
    try {
      Meyda.bufferSize = frameSize;
      Meyda.sampleRate = sampleRate;
      Meyda.windowingFunction = 'hanning';
      Meyda.numberOfMFCCCoefficients = mfccCount;
    } catch (meydaInitError) {
      console.warn('Meyda initialization warning:', meydaInitError);
    }
    
    // Process frames with overlap
    for (let i = 0; i <= channelData.length - frameSize; i += hopSize) {
      frameCount++;
      
      // Extract exact frame of the required size
      const frameData = new Float32Array(frameSize);
      for (let j = 0; j < frameSize; j++) {
        frameData[j] = channelData[i + j] || 0;
      }
      
      // Verify frame size is exactly what Meyda expects
      if (frameData.length !== frameSize) {
        console.warn(`Frame ${frameCount}: incorrect size ${frameData.length}, expected ${frameSize}`);
        continue;
      }
      
      // Check for silent frames (avoid processing silence)
      const energy = frameData.reduce((sum, val) => sum + val * val, 0) / frameData.length;
      if (energy < 1e-8) {
        console.log(`Skipping silent frame ${frameCount}, energy:`, energy);
        continue;
      }
      
      try {
        // Ensure Meyda is properly initialized
        if (typeof Meyda === 'undefined' || !Meyda.extract) {
          throw new Error('Meyda library not properly loaded');
        }
        
        // Extract MFCC features using Meyda with explicit configuration
        const features = Meyda.extract('mfcc', frameData);
        
        if (features && Array.isArray(features) && features.length === mfccCount) {
          // Check for valid values
          const validFeatures = features.every(val => isFinite(val) && !isNaN(val));
          if (validFeatures) {
            mfccs.push([...features]); // Create a copy
            processedFrames++;
            if (processedFrames <= 3) { // Only log first few frames
              console.log(`Frame ${processedFrames} MFCC:`, features.slice(0, 3));
            }
          } else {
            console.warn(`Frame ${frameCount}: Invalid MFCC features detected`, features);
          }
        } else {
          console.warn(`Frame ${frameCount}: MFCC extraction failed, features:`, features);
        }
      } catch (frameError) {
        console.error(`Frame ${frameCount} processing error:`, frameError.message);
        // Don't continue on critical errors
        if (frameError.message.includes('Buffer size must be a power of 2')) {
          throw frameError;
        }
        continue;
      }
    }
    
    console.log(`Processed ${frameCount} frames, extracted ${mfccs.length} valid MFCC vectors`);
    
    // Handle edge cases
    if (mfccs.length === 0) {
      console.error('No valid MFCC features extracted - audio may be silent or corrupted');
      throw new Error('No valid MFCC features could be extracted from the audio');
    }
    
    // If only one frame, return it directly
    if (mfccs.length === 1) {
      console.log('Single frame MFCC:', mfccs[0]);
      return mfccs[0];
    }
    
    // Average MFCCs across all frames for temporal stability
    const avgMfcc = new Array(mfccCount).fill(0);
    mfccs.forEach((mfccFrame) => {
      mfccFrame.forEach((val, idx) => {
        avgMfcc[idx] += val;
      });
    });
    
    const finalMfcc = avgMfcc.map((val) => val / mfccs.length);
    
    console.log('Final averaged MFCC:', {
      length: finalMfcc.length,
      values: finalMfcc.slice(0, 5),
      stats: {
        min: Math.min(...finalMfcc),
        max: Math.max(...finalMfcc),
        mean: finalMfcc.reduce((a, b) => a + b, 0) / finalMfcc.length
      }
    });
    
    // Validate final output
    if (!finalMfcc.every(val => isFinite(val) && !isNaN(val))) {
      console.error('Final MFCC contains invalid values:', finalMfcc);
      throw new Error('Final MFCC contains invalid values');
    }
    
    return finalMfcc;
    
  } catch (error) {
    console.error('MFCC extraction error:', error);
    throw new Error(`MFCC extraction failed: ${error.message}`);
  }
}

/**
 * Compute Euclidean distance between two feature vectors.
 */
export function euclideanDistance(vec1, vec2) {
  if (!Array.isArray(vec1) || !Array.isArray(vec2)) {
    throw new Error("Both inputs must be arrays");
  }
  
  if (vec1.length !== vec2.length) {
    throw new Error(`Vector length mismatch: ${vec1.length} vs ${vec2.length}`);
  }
  
  if (vec1.length === 0) {
    throw new Error("Vectors cannot be empty");
  }
  
  // Check for valid values
  if (!vec1.every(val => isFinite(val) && !isNaN(val))) {
    console.error('vec1 contains invalid values:', vec1);
    throw new Error("Vector 1 contains invalid values (NaN or Infinity)");
  }
  
  if (!vec2.every(val => isFinite(val) && !isNaN(val))) {
    console.error('vec2 contains invalid values:', vec2);
    throw new Error("Vector 2 contains invalid values (NaN or Infinity)");
  }
  
  const distance = Math.sqrt(
    vec1.reduce((sum, val, i) => sum + Math.pow(val - vec2[i], 2), 0)
  );
  
  console.log('Euclidean distance calculated:', {
    vec1Length: vec1.length,
    vec2Length: vec2.length,
    distance: distance,
    vec1Sample: vec1.slice(0, 3),
    vec2Sample: vec2.slice(0, 3)
  });
  
  if (!isFinite(distance) || isNaN(distance)) {
    throw new Error(`Calculated distance is not finite: ${distance}`);
  }
  
  return distance;
}

/**
 * Utility function to validate audio buffer
 */
export function validateAudioBuffer(audioBuffer, name = "AudioBuffer") {
  if (!audioBuffer) {
    throw new Error(`${name} is null or undefined`);
  }
  
  if (typeof audioBuffer.getChannelData !== 'function') {
    throw new Error(`${name} is not a valid AudioBuffer`);
  }
  
  if (audioBuffer.length === 0) {
    throw new Error(`${name} is empty`);
  }
  
  if (audioBuffer.duration <= 0) {
    throw new Error(`${name} has invalid duration: ${audioBuffer.duration}`);
  }
  
  // Check for valid audio data
  const channelData = audioBuffer.getChannelData(0);
  if (!channelData || channelData.length === 0) {
    throw new Error(`${name} has no audio data`);
  }
  
  // Check if audio is not completely silent
  const hasAudio = Array.from(channelData).some(sample => Math.abs(sample) > 1e-6);
  if (!hasAudio) {
    console.warn(`${name} appears to be silent`);
  }
  
  console.log(`${name} validation passed:`, {
    duration: audioBuffer.duration,
    sampleRate: audioBuffer.sampleRate,
    channels: audioBuffer.numberOfChannels,
    length: audioBuffer.length,
    hasAudio: hasAudio
  });
  
  return true;
}