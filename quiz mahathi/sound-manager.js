
// Enhanced Sound Manager for Quiz Game with better compatibility
class SoundManager {
  constructor() {
    this.audioContext = null;
    this.isAudioEnabled = false;
    this.soundCache = new Map();
    this.initializeAudio();
  }

  async initializeAudio() {
    try {
      // Check if Web Audio API is supported
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) {
        console.log('Web Audio API not supported - using fallback sounds');
        this.initializeFallbackAudio();
        return;
      }

      this.audioContext = new AudioContext();
      this.isAudioEnabled = true;
      
      // Pre-generate common sound patterns
      this.preGenerateSounds();
      
    } catch (error) {
      console.log('Audio initialization failed:', error.message);
      this.initializeFallbackAudio();
    }
  }

  initializeFallbackAudio() {
    // Create audio elements as fallback
    this.fallbackSounds = {
      click: this.createBeepAudio(800, 0.1),
      correct: this.createBeepAudio(523, 0.2),
      wrong: this.createBeepAudio(200, 0.3),
      start: this.createBeepAudio(440, 0.15),
      finish: this.createBeepAudio(659, 0.3),
      tick: this.createBeepAudio(1000, 0.05)
    };
  }

  createBeepAudio(frequency, duration) {
    // Create a simple audio element with data URL for fallback
    const oscillations = Math.floor(44100 * duration);
    const data = new Float32Array(oscillations);
    
    for (let i = 0; i < oscillations; i++) {
      data[i] = Math.sin(2 * Math.PI * frequency * i / 44100) * 0.1;
    }
    
    return data;
  }

  preGenerateSounds() {
    if (!this.audioContext) return;

    // Pre-generate sound buffers for better performance
    const soundConfigs = {
      click: { frequency: 800, duration: 0.1, type: 'sine' },
      correct: { frequency: 523, duration: 0.15, type: 'sine' },
      wrong: { frequency: 200, duration: 0.3, type: 'sawtooth' },
      start: { frequency: 440, duration: 0.1, type: 'sine' },
      finish: { frequency: 659, duration: 0.15, type: 'sine' },
      tick: { frequency: 1000, duration: 0.05, type: 'sine' }
    };

    Object.entries(soundConfigs).forEach(([name, config]) => {
      try {
        const buffer = this.generateSoundBuffer(config);
        this.soundCache.set(name, buffer);
      } catch (error) {
        console.log(`Failed to generate ${name} sound:`, error.message);
      }
    });
  }

  generateSoundBuffer({ frequency, duration, type = 'sine' }) {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      let sample = 0;

      switch (type) {
        case 'sine':
          sample = Math.sin(2 * Math.PI * frequency * t);
          break;
        case 'sawtooth':
          sample = 2 * (t * frequency - Math.floor(t * frequency + 0.5));
          break;
        case 'square':
          sample = Math.sign(Math.sin(2 * Math.PI * frequency * t));
          break;
        default:
          sample = Math.sin(2 * Math.PI * frequency * t);
      }

      // Apply envelope for smoother sound
      const envelope = Math.exp(-t * 3);
      data[i] = sample * envelope * 0.1;
    }

    return buffer;
  }

  async ensureAudioContext() {
    if (!this.audioContext) return false;

    // Resume audio context if suspended (required by browsers)
    if (this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
      } catch (error) {
        console.log('Failed to resume audio context:', error.message);
        return false;
      }
    }

    return this.audioContext.state === 'running';
  }

  playBufferedSound(soundName) {
    if (!this.audioContext || !this.soundCache.has(soundName)) {
      return false;
    }

    try {
      const buffer = this.soundCache.get(soundName);
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();

      source.buffer = buffer;
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Set volume
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);

      source.start();
      return true;
    } catch (error) {
      console.log(`Error playing ${soundName}:`, error.message);
      return false;
    }
  }

  playTone(frequency, duration, type = 'sine', volume = 0.1) {
    if (!this.audioContext) return false;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      // Smooth volume envelope
      const now = this.audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(volume, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      oscillator.start(now);
      oscillator.stop(now + duration);
      
      return true;
    } catch (error) {
      console.log('Error playing tone:', error.message);
      return false;
    }
  }

  async playSound(type) {
    // Ensure audio context is ready
    const audioReady = await this.ensureAudioContext();
    
    if (!audioReady && !this.fallbackSounds) {
      // Silently fail if no audio support
      return;
    }

    // Try to play buffered sound first
    if (this.playBufferedSound(type)) {
      return;
    }

    // Fallback to generating tones
    switch (type) {
      case 'click':
        this.playTone(800, 0.1);
        break;
      case 'correct':
        // Success sound - ascending notes
        this.playTone(523, 0.15); // C
        setTimeout(() => this.playTone(659, 0.15), 100); // E
        setTimeout(() => this.playTone(784, 0.2), 200); // G
        break;
      case 'wrong':
        // Error sound - descending buzz
        this.playTone(200, 0.3, 'sawtooth');
        break;
      case 'start':
        // Start sound - cheerful ascending
        this.playTone(440, 0.1);
        setTimeout(() => this.playTone(554, 0.1), 80);
        setTimeout(() => this.playTone(659, 0.15), 160);
        break;
      case 'finish':
        // Finish sound - victory fanfare
        this.playTone(523, 0.15);
        setTimeout(() => this.playTone(659, 0.15), 100);
        setTimeout(() => this.playTone(784, 0.15), 200);
        setTimeout(() => this.playTone(1047, 0.3), 300);
        break;
      case 'tick':
        // Timer tick sound
        this.playTone(1000, 0.05);
        break;
      default:
        this.playTone(440, 0.1);
    }
  }

  // Method to enable audio after user interaction
  async enableAudio() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
        console.log('Audio context resumed');
      } catch (error) {
        console.log('Failed to resume audio:', error.message);
      }
    }
  }

  // Method to check if audio is working
  isAudioWorking() {
    return this.audioContext && this.audioContext.state === 'running';
  }

  // Clean up resources
  destroy() {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.soundCache.clear();
  }
}

// Create global sound manager instance with error handling
let soundManager;

try {
  soundManager = new SoundManager();
} catch (error) {
  console.log('Failed to create sound manager:', error.message);
  // Create a dummy sound manager that doesn't throw errors
  soundManager = {
    playSound: () => {},
    enableAudio: () => Promise.resolve(),
    isAudioWorking: () => false,
    destroy: () => {}
  };
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SoundManager, soundManager };
}
