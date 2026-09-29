// ============================================================================
// NATURE SOUND ENGINE - REALISTIC ORGANISM & HABITAT AUDIO SYNTHESIZER
// High-Fidelity Procedural Web Audio for NCERT Class 6 Living World Activity
// ============================================================================

class NatureSoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --------------------------------------------------------------------------
  // 1. COW MOO (Realistic Zebu/Indian Cattle Lowing)
  // Harmonic formant synthesis: fundamental (130-165Hz) + throat formants + pitch glide
  // --------------------------------------------------------------------------
  playCowMoo() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const duration = 1.45;

    // Master Gain for Moo
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(0.35, now + 0.18);
    masterGain.gain.setValueAtTime(0.35, now + 0.95);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    masterGain.connect(ctx.destination);

    // Formant Filter (Mouth / Oral Cavity Resonance around 520Hz)
    const formantFilter = ctx.createBiquadFilter();
    formantFilter.type = 'bandpass';
    formantFilter.frequency.setValueAtTime(450, now);
    formantFilter.frequency.linearRampToValueAtTime(620, now + 0.4);
    formantFilter.frequency.linearRampToValueAtTime(400, now + duration);
    formantFilter.Q.setValueAtTime(3.5, now);
    formantFilter.connect(masterGain);

    // Direct warm low-pass path for body chest resonance
    const chestFilter = ctx.createBiquadFilter();
    chestFilter.type = 'lowpass';
    chestFilter.frequency.setValueAtTime(320, now);
    chestFilter.connect(masterGain);

    // Vibrato LFO (slight natural vocal tremor at 5.5 Hz)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(5.2, now);
    lfoGain.gain.setValueAtTime(4.0, now);
    lfo.connect(lfoGain);

    // Harmonics for rich bovine vocal cords:
    // F0: Fundamental ~135Hz -> 158Hz -> 125Hz
    const harmonics = [
      { mult: 1, type: 'sawtooth', gainVal: 0.45 },
      { mult: 2, type: 'triangle', gainVal: 0.35 },
      { mult: 3, type: 'sine', gainVal: 0.25 },
      { mult: 4, type: 'sine', gainVal: 0.15 }
    ];

    harmonics.forEach(({ mult, type, gainVal }) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;

      // Base Pitch Glide: "M-oooo-w"
      osc.frequency.setValueAtTime(130 * mult, now);
      osc.frequency.exponentialRampToValueAtTime(158 * mult, now + 0.35);
      osc.frequency.exponentialRampToValueAtTime(150 * mult, now + 0.85);
      osc.frequency.exponentialRampToValueAtTime(118 * mult, now + duration);

      lfoGain.connect(osc.frequency);
      g.gain.setValueAtTime(gainVal, now);

      osc.connect(g);
      g.connect(formantFilter);
      g.connect(chestFilter);

      osc.start(now);
      osc.stop(now + duration);
    });

    lfo.start(now);
    lfo.stop(now + duration);
  }

  // --------------------------------------------------------------------------
  // 2. FRESHWATER FISH (Water Splash + Aquatic Bubbles Stream)
  // Water slosh noise band + rapid ascending bubble resonators
  // --------------------------------------------------------------------------
  playFishSplash() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // A) Water Plunge / Splash Noise
    const bufferSize = ctx.sampleRate * 0.45;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(900, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(350, now + 0.4);
    noiseFilter.Q.setValueAtTime(2.2, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, now);
    noiseGain.gain.linearRampToValueAtTime(0.28, now + 0.04);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.45);

    // B) Multiple Ascending Bubble Drops (Bloop, bloop, blip!)
    const bubbleOffsets = [0.03, 0.09, 0.17, 0.24, 0.32];
    const bubbleFreqs = [420, 680, 510, 850, 720];

    bubbleOffsets.forEach((delay, idx) => {
      const bTime = now + delay;
      const bOsc = ctx.createOscillator();
      const bGain = ctx.createGain();

      bOsc.type = 'sine';
      const startF = bubbleFreqs[idx];
      bOsc.frequency.setValueAtTime(startF, bTime);
      bOsc.frequency.exponentialRampToValueAtTime(startF * 1.85, bTime + 0.08);

      bGain.gain.setValueAtTime(0.001, bTime);
      bGain.gain.linearRampToValueAtTime(0.22, bTime + 0.015);
      bGain.gain.exponentialRampToValueAtTime(0.001, bTime + 0.085);

      bOsc.connect(bGain);
      bGain.connect(ctx.destination);

      bOsc.start(bTime);
      bOsc.stop(bTime + 0.09);
    });
  }

  // --------------------------------------------------------------------------
  // 3. LOTUS PLANT (Serene Water Drop Plop & Harmonic Pond Ripple)
  // --------------------------------------------------------------------------
  playLotusDrop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Resonant Water Plink
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';

    osc.frequency.setValueAtTime(750, now);
    osc.frequency.exponentialRampToValueAtTime(1450, now + 0.06);
    osc.frequency.exponentialRampToValueAtTime(920, now + 0.22);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.30, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.48);

    // Warm peaceful aquatic chime echo (F6 & A6)
    [880, 1174.66].forEach((f, i) => {
      const chOsc = ctx.createOscillator();
      const chGain = ctx.createGain();
      chOsc.type = 'triangle';
      chOsc.frequency.setValueAtTime(f, now + 0.08 + i * 0.06);

      chGain.gain.setValueAtTime(0.001, now + 0.08 + i * 0.06);
      chGain.gain.linearRampToValueAtTime(0.12, now + 0.10 + i * 0.06);
      chGain.gain.exponentialRampToValueAtTime(0.001, now + 0.60 + i * 0.06);

      chOsc.connect(chGain);
      chGain.connect(ctx.destination);

      chOsc.start(now + 0.08 + i * 0.06);
      chOsc.stop(now + 0.65 + i * 0.06);
    });
  }

  // --------------------------------------------------------------------------
  // 4. MANGO TREE (Canopy Breeze Gust & Woodland Songbird Warble)
  // --------------------------------------------------------------------------
  playMangoTreeRustle() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // A) Soft Leaf Rustle / Wind Gust
    const bufferSize = ctx.sampleRate * 0.6;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const wind = ctx.createBufferSource();
    wind.buffer = noiseBuffer;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(450, now);
    windFilter.frequency.linearRampToValueAtTime(950, now + 0.25);
    windFilter.frequency.exponentialRampToValueAtTime(320, now + 0.58);

    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.001, now);
    windGain.gain.linearRampToValueAtTime(0.20, now + 0.15);
    windGain.gain.exponentialRampToValueAtTime(0.001, now + 0.58);

    wind.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(ctx.destination);

    wind.start(now);
    wind.stop(now + 0.6);

    // B) Friendly Forest Songbird Chirp (Two quick warbles)
    const birdTimes = [0.12, 0.28];
    birdTimes.forEach((bTime) => {
      const birdOsc = ctx.createOscillator();
      const birdGain = ctx.createGain();
      birdOsc.type = 'sine';

      birdOsc.frequency.setValueAtTime(2400, now + bTime);
      birdOsc.frequency.linearRampToValueAtTime(3200, now + bTime + 0.04);
      birdOsc.frequency.linearRampToValueAtTime(2200, now + bTime + 0.09);

      birdGain.gain.setValueAtTime(0.001, now + bTime);
      birdGain.gain.linearRampToValueAtTime(0.14, now + bTime + 0.02);
      birdGain.gain.exponentialRampToValueAtTime(0.001, now + bTime + 0.09);

      birdOsc.connect(birdGain);
      birdGain.connect(ctx.destination);

      birdOsc.start(now + bTime);
      birdOsc.stop(now + bTime + 0.1);
    });
  }

  // --------------------------------------------------------------------------
  // 5. ROSE PLANT (Floral Garden Chime & Velvet Breeze)
  // --------------------------------------------------------------------------
  playRoseChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Floral Velvet Chord (E5, G#5, B5, E6)
    const freqs = [659.25, 830.61, 987.77, 1318.51];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + i * 0.045);

      gain.gain.setValueAtTime(0.001, now + i * 0.045);
      gain.gain.linearRampToValueAtTime(0.18, now + i * 0.045 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.045 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.045);
      osc.stop(now + i * 0.045 + 0.48);
    });
  }

  // --------------------------------------------------------------------------
  // 6. FERN PLANT (Ancient Forest Woodblock & Moss Spore Whispers)
  // --------------------------------------------------------------------------
  playFernRustle() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Wooden Marimba Tap
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.24);

    // Forest Whisper Chime
    [587.33, 880, 1174.66].forEach((f, i) => {
      const ch = ctx.createOscillator();
      const g = ctx.createGain();
      ch.type = 'sine';
      ch.frequency.setValueAtTime(f, now + 0.06 + i * 0.05);

      g.gain.setValueAtTime(0.001, now + 0.06 + i * 0.05);
      g.gain.linearRampToValueAtTime(0.15, now + 0.08 + i * 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.45 + i * 0.05);

      ch.connect(g);
      g.connect(ctx.destination);

      ch.start(now + 0.06 + i * 0.05);
      ch.stop(now + 0.48 + i * 0.05);
    });
  }

  // --------------------------------------------------------------------------
  // Dispatch Organism Specific Sound
  // --------------------------------------------------------------------------
  playOrganismSound(organismId) {
    switch (organismId) {
      case 'cow':
        this.playCowMoo();
        break;
      case 'fish':
        this.playFishSplash();
        break;
      case 'lotus':
        this.playLotusDrop();
        break;
      case 'mango':
        this.playMangoTreeRustle();
        break;
      case 'rose':
        this.playRoseChime();
        break;
      case 'fern':
        this.playFernRustle();
        break;
      default:
        this.playSuccessChime();
        break;
    }
  }

  // --------------------------------------------------------------------------
  // Success & Completion Fanfares
  // --------------------------------------------------------------------------
  playSuccessChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
      gain.gain.setValueAtTime(0.16, ctx.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.30);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.06);
      osc.stop(ctx.currentTime + idx * 0.06 + 0.30);
    });
  }

  playCompletionFanfare() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const freqs = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
      gain.gain.setValueAtTime(0.20, ctx.currentTime + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.07);
      osc.stop(ctx.currentTime + idx * 0.07 + 0.45);
    });
  }

  playTryAgain() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.22);
    gain.gain.setValueAtTime(0.16, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.22);
  }
}

export const natureAudio = new NatureSoundEngine();
export default natureAudio;
